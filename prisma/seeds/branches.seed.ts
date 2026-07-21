import { prisma } from "../../src/database/prisma.js";


const branches = [

    {
        city: "Addis Ababa",
        name: "Addis Ababa Main Branch",
        address: "Mexico Square, Addis Ababa",
        phone: "+251911000001",
        managerName: "Main Branch Manager",
    },

    {
        city: "Mekelle",
        name: "Mekelle Branch",
        address: "Downtown Mekelle",
        phone: "+251911000002",
        managerName: "Mekelle Branch Manager",
    },

    {
        city: "Adama",
        name: "Adama Branch",
        address: "Adama Bus Terminal",
        phone: "+251911000003",
        managerName: "Adama Branch Manager",
    },

    {
        city: "Bahir Dar",
        name: "Bahir Dar Branch",
        address: "Bahir Dar Main Station",
        phone: "+251911000004",
        managerName: "Bahir Dar Branch Manager",
    },

] as const;



export async function seedBranches(): Promise<void> {


    console.log("🌱 Seeding branches...");


    for (const branch of branches) {


        const city = await prisma.city.findUnique({

            where: {

                name_region: {

                    name: branch.city,

                    region:
                        branch.city === "Mekelle"
                            ? "Tigray"
                            : branch.city === "Adama"
                            ? "Oromia"
                            : branch.city === "Bahir Dar"
                            ? "Amhara"
                            : "Addis Ababa",

                },

            },

        });



        if (!city) {

            throw new Error(
                `City ${branch.city} not found`
            );

        }



        await prisma.branch.upsert({

            where: {

                id: BigInt(0), // temporary because no unique name

            },


            update: {

                address: branch.address,

                phone: branch.phone,

                managerName: branch.managerName,

            },


            create: {

                cityId: city.id,

                name: branch.name,

                address: branch.address,

                phone: branch.phone,

                managerName: branch.managerName,

            },

        });


    }


    console.log(`✅ Seeded ${branches.length} branches.`);

}