import { prisma } from "../../src/database/prisma.js";

const roles = [

    {
        name: "SUPER_ADMIN",
        description: "Full access to the entire system",
    },

    {
        name: "SYSTEM_ADMIN",
        description: "Manage system configuration, users and permissions",
    },

    {
        name: "OPERATIONS_MANAGER",
        description: "Manage routes, vehicles, drivers and schedules",
    },

    {
        name: "BRANCH_MANAGER",
        description: "Manage branch operations",
    },

    {
        name: "TICKET_AGENT",
        description: "Sell and manage passenger tickets",
    },

] as const;


export async function seedRoles(): Promise<void> {

    console.log("🌱 Seeding roles...");


    for (const role of roles) {

        await prisma.role.upsert({

            where: {
                name: role.name,
            },

            update: {
                description: role.description,
            },

            create: {

                name: role.name,

                description: role.description,

            },

        });

    }


    console.log(`✅ Seeded ${roles.length} roles.`);

}