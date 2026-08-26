import { prisma } from "../db/prisma";
import { verifyAuthToken, type AuthTokenPayload } from "../auth/token";

export interface GraphQLContext {
    prisma: typeof prisma;
    auth: AuthTokenPayload | null;
}

function extractBearerToken(
    authorizationHeader: string | undefined,
): string | null {
    if (!authorizationHeader) {
        return null;
    }

    const [scheme, token] = authorizationHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return null;
    }

    return token;
}

export function createContext(
    request: Request,
): GraphQLContext {
    const token = extractBearerToken(
        request.headers.get("authorization") ?? undefined,
    );

    if (!token) {
        return {
            prisma,
            auth: null,
        };
    }

    try {
        return {
            prisma,
            auth: verifyAuthToken(token),
        };
    } catch {
        return {
            prisma,
            auth: null,
        };
    }
}