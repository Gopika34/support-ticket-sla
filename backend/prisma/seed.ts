import "dotenv/config";
import {
    TicketPriority,
    TicketStatus,
    UserRole,
} from "@prisma/client";

import { prisma } from "../src/db/prisma";

async function main(): Promise<void> {
    console.log("🌱 Starting database seed...");

    // Clear existing development data.
    await prisma.comment.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.holiday.deleteMany();
    await prisma.user.deleteMany();

    const reporter = await prisma.user.create({
        data: {
            name: "Demo Reporter",
            email: "reporter@example.com",
            passwordHash: "seed-password-placeholder",
            role: UserRole.REPORTER,
        },
    });

    const agent = await prisma.user.create({
        data: {
            name: "Demo Agent",
            email: "agent@example.com",
            passwordHash: "seed-password-placeholder",
            role: UserRole.AGENT,
        },
    });

    await prisma.ticket.createMany({
        data: [
            {
                title: "Production API outage",
                description: "The production API is returning 500 errors.",
                priority: TicketPriority.URGENT,
                status: TicketStatus.OPEN,
                reporterId: reporter.id,
                assigneeId: agent.id,
            },
            {
                title: "Unable to login",
                description: "The user cannot log into the application.",
                priority: TicketPriority.HIGH,
                status: TicketStatus.IN_PROGRESS,
                reporterId: reporter.id,
                assigneeId: agent.id,
            },
            {
                title: "Billing clarification",
                description: "The user needs clarification about their latest invoice.",
                priority: TicketPriority.MEDIUM,
                status: TicketStatus.OPEN,
                reporterId: reporter.id,
            },
            {
                title: "Feature request",
                description: "The user would like a dark mode option.",
                priority: TicketPriority.LOW,
                status: TicketStatus.OPEN,
                reporterId: reporter.id,
            },
        ],
    });

    await prisma.holiday.create({
        data: {
            name: "Demo Holiday",
            date: new Date("2026-08-31T00:00:00.000Z"),
        },
    });

    console.log("✅ Database seed completed.");
}

async function run(): Promise<void> {
    try {
        await main();
    } catch (error: unknown) {
        console.error("❌ Seed failed:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

await run();