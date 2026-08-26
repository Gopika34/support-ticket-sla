import type { GraphQLContext } from "./context";
import { registerUser, loginUser } from "../services/auth.service";

export const resolvers = {
    Query: {
        me: async (
            _parent: unknown,
            _args: unknown,
            context: GraphQLContext,
        ) => {
            if (!context.auth) {
                return null;
            }

            return context.prisma.user.findUnique({
                where: {
                    id: context.auth.userId,
                },
            });
        },
    },

    Mutation: {
        register: async (
            _parent: unknown,
            args: {
                input: {
                    name: string;
                    email: string;
                    password: string;
                    role: "REPORTER" | "AGENT";
                };
            },
        ) => {
            return registerUser(args.input);
        },

        login: async (
            _parent: unknown,
            args: {
                input: {
                    email: string;
                    password: string;
                };
            },
        ) => {
            return loginUser(args.input);
        },
    },
};