import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Album, Artist, Track } from '@prisma/client';
import { AlbumIdParams } from 'src/album/dto/album-id.params';
import { ArtistIdParams } from 'src/artist/dto/artist-id.params';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { TrackIdParams } from 'src/track/dto/track-id.params';
import { FavoritesExceptionFilter } from './exception.filter';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './interfaces';

@UseGuards(AccessGuard)
@UseFilters(FavoritesExceptionFilter)
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll(): Promise<FavoritesResponse> {
    return this.favoritesService.getFavorites();
  }

  @Post('artist/:id')
  addArtist(@Param() params: ArtistIdParams): Promise<Artist> {
    return this.favoritesService.addArtist(params.id);
  }

  @Post('album/:id')
  addAlbum(@Param() params: AlbumIdParams): Promise<Album> {
    return this.favoritesService.addAlbum(params.id);
  }

  @Post('track/:id')
  addTrack(@Param() params: TrackIdParams): Promise<Track> {
    return this.favoritesService.addTrack(params.id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param() params: ArtistIdParams): Promise<void> {
    await this.favoritesService.removeArtist(params.id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param() params: AlbumIdParams): Promise<void> {
    await this.favoritesService.removeAlbum(params.id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param() params: TrackIdParams): Promise<void> {
    await this.favoritesService.removeTrack(params.id);
  }
}
