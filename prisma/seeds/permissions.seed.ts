import { prisma } from "../../src/database/prisma.js";

const permissions = [

    /*
    |--------------------------------------------------------------------------
    | Users
    |--------------------------------------------------------------------------
    */

    {
        name: "users.create",
        description: "Create users",
    },

    {
        name: "users.read",
        description: "View users",
    },

    {
        name: "users.update",
        description: "Update users",
    },

    {
        name: "users.delete",
        description: "Delete users",
    },

    /*
    |--------------------------------------------------------------------------
    | Roles
    |--------------------------------------------------------------------------
    */

    {
        name: "roles.create",
        description: "Create roles",
    },

    {
        name: "roles.read",
        description: "View roles",
    },

    {
        name: "roles.update",
        description: "Update roles",
    },

    {
        name: "roles.delete",
        description: "Delete roles",
    },

    /*
    |--------------------------------------------------------------------------
    | Permissions
    |--------------------------------------------------------------------------
    */

    {
        name: "permissions.read",
        description: "View permissions",
    },

    /*
    |--------------------------------------------------------------------------
    | Cities
    |--------------------------------------------------------------------------
    */

    {
        name: "cities.create",
        description: "Create cities",
    },

    {
        name: "cities.read",
        description: "View cities",
    },

    {
        name: "cities.update",
        description: "Update cities",
    },

    {
        name: "cities.delete",
        description: "Delete cities",
    },

    /*
    |--------------------------------------------------------------------------
    | Branches
    |--------------------------------------------------------------------------
    */

    {
        name: "branches.create",
        description: "Create branches",
    },

    {
        name: "branches.read",
        description: "View branches",
    },

    {
        name: "branches.update",
        description: "Update branches",
    },

    {
        name: "branches.delete",
        description: "Delete branches",
    },

    /*
    |--------------------------------------------------------------------------
    | Routes
    |--------------------------------------------------------------------------
    */

    {
        name: "routes.create",
        description: "Create routes",
    },

    {
        name: "routes.read",
        description: "View routes",
    },

    {
        name: "routes.update",
        description: "Update routes",
    },

    {
        name: "routes.delete",
        description: "Delete routes",
    },

    /*
    |--------------------------------------------------------------------------
    | Vehicles
    |--------------------------------------------------------------------------
    */

    {
        name: "vehicles.create",
        description: "Create vehicles",
    },

    {
        name: "vehicles.read",
        description: "View vehicles",
    },

    {
        name: "vehicles.update",
        description: "Update vehicles",
    },

    {
        name: "vehicles.delete",
        description: "Delete vehicles",
    },

    /*
    |--------------------------------------------------------------------------
    | Drivers
    |--------------------------------------------------------------------------
    */

    {
        name: "drivers.create",
        description: "Create drivers",
    },

    {
        name: "drivers.read",
        description: "View drivers",
    },

    {
        name: "drivers.update",
        description: "Update drivers",
    },

    {
        name: "drivers.delete",
        description: "Delete drivers",
    },

    /*
    |--------------------------------------------------------------------------
    | Schedules
    |--------------------------------------------------------------------------
    */

    {
        name: "schedules.create",
        description: "Create schedules",
    },

    {
        name: "schedules.read",
        description: "View schedules",
    },

    {
        name: "schedules.update",
        description: "Update schedules",
    },

    {
        name: "schedules.delete",
        description: "Delete schedules",
    },

    /*
    |--------------------------------------------------------------------------
    | Passengers
    |--------------------------------------------------------------------------
    */

    {
        name: "passengers.read",
        description: "View passengers",
    },

    {
        name: "passengers.update",
        description: "Update passengers",
    },

    /*
    |--------------------------------------------------------------------------
    | Bookings
    |--------------------------------------------------------------------------
    */

    {
        name: "bookings.create",
        description: "Create bookings",
    },

    {
        name: "bookings.read",
        description: "View bookings",
    },

    {
        name: "bookings.update",
        description: "Update bookings",
    },

    {
        name: "bookings.cancel",
        description: "Cancel bookings",
    },

    /*
    |--------------------------------------------------------------------------
    | Payments
    |--------------------------------------------------------------------------
    */

    {
        name: "payments.read",
        description: "View payments",
    },

    {
        name: "payments.refund",
        description: "Refund payments",
    },

    /*
    |--------------------------------------------------------------------------
    | Reports
    |--------------------------------------------------------------------------
    */

    {
        name: "reports.read",
        description: "View reports",
    },

    /*
    |--------------------------------------------------------------------------
    | Audit Logs
    |--------------------------------------------------------------------------
    */

    {
        name: "auditlogs.read",
        description: "View audit logs",
    },

] as const;

export async function seedPermissions(): Promise<void> {

    console.log("🌱 Seeding permissions...");

    for (const permission of permissions) {

        await prisma.permission.upsert({

            where: {

                name: permission.name,

            },

            update: {

                description: permission.description,

            },

            create: {

                name: permission.name,

                description: permission.description,

            },

        });

    }

    console.log(`✅ Seeded ${permissions.length} permissions.`);

}