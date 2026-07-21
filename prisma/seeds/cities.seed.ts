import { prisma } from ".././../src/database/prisma.js";


const cities = [

    {
        name: "Addis Ababa",
        region: "Addis Ababa",
        country: "Ethiopia",
    },

    {
        name: "Mekelle",
        region: "Tigray",
        country: "Ethiopia",
    },

    {
        name: "Adama",
        region: "Oromia",
        country: "Ethiopia",
    },

    {
        name: "Bahir Dar",
        region: "Amhara",
        country: "Ethiopia",
    },

    {
        name: "Hawassa",
        region: "Sidama",
        country: "Ethiopia",
    },

    {
        name: "Dire Dawa",
        region: "Dire Dawa",
        country: "Ethiopia",
    },

] as const;



export async function seedCities(): Promise<void> {


    console.log("🌱 Seeding cities...");


    for (const city of cities) {


        await prisma.city.upsert({

            where: {

                name_region: {

                    name: city.name,

                    region: city.region,

                },

            },


            update: {

                country: city.country,

            },


            create: {

                name: city.name,

                region: city.region,

                country: city.country,

            },

        });


    }


    console.log(`✅ Seeded ${cities.length} cities.`);


}