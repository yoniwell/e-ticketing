import { prisma } from "../../src/database/prisma.js";


const vehicleTypes = [

    {
        name: "STANDARD_BUS",
        description: "Regular passenger bus",
        capacity: 45,
    },

    {
        name: "MINI_BUS",
        description: "Small passenger bus for short routes",
        capacity: 25,
    },

    {
        name: "VIP_BUS",
        description: "Luxury bus with premium seats",
        capacity: 35,
    },

] as const;



export async function seedVehicleTypes(): Promise<void> {


    console.log("🌱 Seeding vehicle types...");


    for (const vehicleType of vehicleTypes) {


        await prisma.vehicleType.upsert({

            where: {

                name: vehicleType.name,

            },


            update: {

                description: vehicleType.description,

                capacity: vehicleType.capacity,

            },


            create: {

                name: vehicleType.name,

                description: vehicleType.description,

                capacity: vehicleType.capacity,

            },

        });


    }


    console.log(
        `✅ Seeded ${vehicleTypes.length} vehicle types.`
    );


}