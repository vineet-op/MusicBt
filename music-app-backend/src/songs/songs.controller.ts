// src/songs/songs.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
    constructor(private readonly songsService: SongsService) { }

    @Get()
    findAll() {
        return this.songsService.findAll();
    }

    @Get('search')
    search(@Query('q') query: string) {
        return this.songsService.search(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.songsService.findOne(+id);
    }
}