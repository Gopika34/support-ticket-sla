import jwt from "jsonwebtoken";

export interface AuthTokenPayload {
    userId: string;
}

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not configured");
    }

    return secret;
}

export function createAuthToken(userId: string): string {
    const payload: AuthTokenPayload = {
        userId,
    };

    return jwt.sign(payload, getJwtSecret(), {
        expiresIn: "1h",
    });
}

export function verifyAuthToken(token: string): AuthTokenPayload {
    const decoded = jwt.verify(token, getJwtSecret());

    if (
        typeof decoded !== "object" ||
        decoded === null ||
        typeof decoded.userId !== "string"
    ) {
        throw new Error("Invalid authentication token");
    }

    return {
        userId: decoded.userId,
    };
}