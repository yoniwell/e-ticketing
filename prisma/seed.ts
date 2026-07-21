import { prisma } from "../src/database/prisma.js";


import { seedPermissions } from "./seeds/permissions.seed.js";

import {seedRoles} from "./seeds/roles.seed.js";
 import { seedRolePermissions } from "./seeds/role-permissions.seed.js";
 import { seedCities } from "./seeds/cities.seed.js";
 import { seedBranches } from "./seeds/branches.seed.js";
 import { seedVehicleTypes } from "./seeds/vehicle-types.seed.js";
 import { seedAdmin } from "./seeds/admin.seed.js";

async function main(): Promise<void> {

    console.log("🌱 Starting database seeding...\n");

    await seedPermissions();
     await seedRoles();
    await seedRolePermissions();
    await seedCities();
    await seedBranches();
     await seedVehicleTypes();
     await seedAdmin();

    console.log("\n✅ Database seeded successfully.");

}

main()
    .catch((error) => {

        console.error(error);

        process.exit(1);

    })
    .finally(async () => {

        await prisma.$disconnect();

    });