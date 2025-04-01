// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create a user
    const user = await prisma.user.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: 'Test User',
        },
    });

    // Create some songs
    const songs = [
        {
            title: 'Bohemian Rhapsody',
            artist: 'Queen',
            album: 'A Night at the Opera',
        },
        {
            title: 'Billie Jean',
            artist: 'Michael Jackson',
            album: 'Thriller',
        },
        {
            title: 'Imagine',
            artist: 'John Lennon',
            album: 'Imagine',
        },
    ];

    for (const song of songs) {
        await prisma.song.create({
            data: song,
        });
    }

    console.log('Database seeded!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });