// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SongsModule } from './songs/songs.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [PrismaModule, SongsModule, FavoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }