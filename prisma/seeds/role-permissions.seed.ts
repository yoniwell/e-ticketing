import { prisma } from "../../src/database/prisma.js";


const rolePermissions = {

    SUPER_ADMIN: [
        "*",
    ],


    SYSTEM_ADMIN: [

        "users.create",
        "users.read",
        "users.update",
        "users.delete",

        "roles.create",
        "roles.read",
        "roles.update",
        "roles.delete",

        "permissions.read",

        "branches.create",
        "branches.read",
        "branches.update",
        "branches.delete",

        "cities.create",
        "cities.read",
        "cities.update",
        "cities.delete",

        "auditlogs.read",

    ],


    OPERATIONS_MANAGER: [

        "routes.create",
        "routes.read",
        "routes.update",
        "routes.delete",

        "vehicles.create",
        "vehicles.read",
        "vehicles.update",
        "vehicles.delete",

        "drivers.create",
        "drivers.read",
        "drivers.update",
        "drivers.delete",

        "schedules.create",
        "schedules.read",
        "schedules.update",
        "schedules.delete",

    ],


    BRANCH_MANAGER: [

        "branches.read",

        "routes.read",

        "schedules.read",

        "bookings.read",

        "passengers.read",

    ],


    TICKET_AGENT: [

        "bookings.create",

        "bookings.read",

        "bookings.update",

        "bookings.cancel",

        "passengers.read",

    ],

} as const;



export async function seedRolePermissions(): Promise<void> {


    console.log("🌱 Seeding role permissions...");


    for (const [roleName, permissions] of Object.entries(rolePermissions)) {


        const role = await prisma.role.findUnique({

            where: {

                name: roleName,

            },

        });


        if (!role) {

            throw new Error(
                `Role ${roleName} not found`
            );

        }



        for (const permissionName of permissions) {


            // SUPER_ADMIN gets everything

            if (permissionName === "*") {


                const allPermissions =
                    await prisma.permission.findMany();



                for (const permission of allPermissions) {


                    await prisma.rolePermission.upsert({

                        where: {

                            roleId_permissionId: {

                                roleId: role.id,

                                permissionId: permission.id,

                            },

                        },


                        update: {},


                        create: {

                            roleId: role.id,

                            permissionId: permission.id,

                        },

                    });

                }


                continue;

            }



            const permission =
                await prisma.permission.findUnique({

                    where: {

                        name: permissionName,

                    },

                });



            if (!permission) {

                throw new Error(
                    `Permission ${permissionName} not found`
                );

            }



            await prisma.rolePermission.upsert({

                where: {

                    roleId_permissionId: {

                        roleId: role.id,

                        permissionId: permission.id,

                    },

                },


                update: {},


                create: {

                    roleId: role.id,

                    permissionId: permission.id,

                },

            });


        }

    }


    console.log("✅ Role permissions seeded.");

}