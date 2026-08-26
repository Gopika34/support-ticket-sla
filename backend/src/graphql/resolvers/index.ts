export const resolvers = {
    Query: {
        health: () => ({
            status: "ok",
            service: "support-ticket-sla-api",
        }),
    },
};