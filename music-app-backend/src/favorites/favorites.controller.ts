// src/favorites/favorites.controller.ts
import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('users/:userId/favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) { }

    @Get()
    getFavorites(@Param('userId') userId: string) {
        return this.favoritesService.getFavorites(+userId);
    }

    @Post(':songId')
    addFavorite(
        @Param('userId') userId: string,
        @Param('songId') songId: string,
    ) {
        return this.favoritesService.addFavorite(+userId, +songId);
    }

    @Delete(':songId')
    removeFavorite(
        @Param('userId') userId: string,
        @Param('songId') songId: string,
    ) {
        return this.favoritesService.removeFavorite(+userId, +songId);
    }
}