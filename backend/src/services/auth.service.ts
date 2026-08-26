import { GraphQLError } from "graphql";

import { prisma } from "../db/prisma";
import { hashPassword, verifyPassword } from "../auth/password";
import { createAuthToken } from "../auth/token";

interface RegisterInput {
    name: string;
    email: string;
    password: string;
    role: "REPORTER" | "AGENT";
}

interface LoginInput {
    email: string;
    password: string;
}

export async function registerUser(input: RegisterInput) {
    const name = input.name.trim();
    const email = input.email.trim().toLowerCase();

    if (!name || !email || !input.password) {
        throw new GraphQLError("Name, email and password are required");
    }

    if (input.password.length < 8) {
        throw new GraphQLError(
            "Password must be at least 8 characters",
        );
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new GraphQLError("Email is already registered");
    }

    const passwordHash = await hashPassword(input.password);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash,
            role: input.role,
        },
    });

    const token = createAuthToken(user.id);

    return {
        token,
        user,
    };
}

export async function loginUser(input: LoginInput) {
    const email = input.email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new GraphQLError("Invalid email or password");
    }

    const passwordValid = await verifyPassword(
        input.password,
        user.passwordHash,
    );

    if (!passwordValid) {
        throw new GraphQLError("Invalid email or password");
    }

    const token = createAuthToken(user.id);

    return {
        token,
        user,
    };
}