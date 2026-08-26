import { createSchema, createYoga } from "graphql-yoga";
import { serve } from "bun";

import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { createContext, type GraphQLContext } from "./graphql/context";

const schema = createSchema<GraphQLContext>({
    typeDefs,
    resolvers,
});

const yoga = createYoga<GraphQLContext>({
    schema,
    context: ({ request }) => createContext(request),
});

const server = serve({
    port: 4000,
    fetch(request) {
        return yoga.fetch(request);
    },
});

console.log(
    `🚀 GraphQL server running at http://localhost:${server.port}/graphql`,
);