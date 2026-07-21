import bcrypt from "bcrypt";

import { prisma } from "../../src/database/prisma.js";


export async function seedAdmin (): Promise<void> {


    console.log("🌱 Seeding system users...");


    const superAdminRole = await prisma.role.findUnique({

        where: {

            name: "SUPER_ADMIN",

        },

    });


    if (!superAdminRole) {

        throw new Error(
            "SUPER_ADMIN role not found"
        );

    }



    const branch = await prisma.branch.findFirst({

        where: {

            name: "Addis Ababa Main Branch",

        },

    });



    if (!branch) {

        throw new Error(
            "Default branch not found"
        );

    }



    const passwordHash = await bcrypt.hash(

        "Admin@123",

        12

    );



    await prisma.user.upsert({

        where: {

            email: "admin@eticketing.com",

        },


        update: {

            roleId: superAdminRole.id,

            branchId: branch.id,

        },


        create: {

            firstName: "System",

            lastName: "Administrator",

            email: "admin@eticketing.com",

            phoneNumber: "+251911111111",

            passwordHash,

            roleId: superAdminRole.id,

            branchId: branch.id,

            status: "ACTIVE",

        },

    });



    console.log(
        "✅ System admin user created."
    );


}