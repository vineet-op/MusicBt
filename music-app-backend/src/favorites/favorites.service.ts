// src/favorites/favorites.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
    constructor(private prisma: PrismaService) { }

    async addFavorite(userId: number, songId: number) {
        // Verify song exists
        const song = await this.prisma.song.findUnique({
            where: { id: songId },
        });

        if (!song) {
            throw new NotFoundException(`Song with ID ${songId} not found`);
        }

        // Add to favorites
        try {
            return await this.prisma.userFavorite.create({
                data: {
                    userId,
                    songId,
                },
            });
        } catch (error) {
            if (error.code === 'P2002') {
                return { message: 'Song already in favorites' };
            }
            throw error;
        }
    }

    async removeFavorite(userId: number, songId: number) {
        try {
            return await this.prisma.userFavorite.delete({
                where: {
                    userId_songId: {
                        userId,
                        songId,
                    },
                },
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException('Favorite not found');
            }
            throw error;
        }
    }

    getFavorites(userId: number) {
        return this.prisma.song.findMany({
            where: {
                favorites: {
                    some: {
                        userId,
                    },
                },
            },
        });
    }
}