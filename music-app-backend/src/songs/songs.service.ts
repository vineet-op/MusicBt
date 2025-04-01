// src/songs/songs.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SongsService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.song.findMany();
    }

    findOne(id: number) {
        return this.prisma.song.findUnique({
            where: { id },
        });
    }

    search(query: string) {
        return this.prisma.song.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                    {
                        artist: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                    {
                        album: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        });
    }
}