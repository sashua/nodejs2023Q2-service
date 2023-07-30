import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumIdParams } from 'src/album/dto/album-id.params';
import { ArtistIdParams } from 'src/artist/dto/artist-id.params';
import { Album, Artist, Track } from 'src/db/interfaces';
import { TrackIdParams } from 'src/track/dto/track-id.params';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './interfaces';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll(): FavoritesResponse {
    return this.favoritesService.getAll();
  }

  @Post('artist/:id')
  addArtist(@Param() params: ArtistIdParams): Artist['id'] {
    const id = this.favoritesService.addArtist(params.id);
    if (id === null) throw new UnprocessableEntityException();
    return id;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param() params: ArtistIdParams) {
    const id = this.favoritesService.removeArtist(params.id);
    if (id === null) throw new NotFoundException();
  }

  @Post('album/:id')
  addAlbum(@Param() params: AlbumIdParams): Album['id'] {
    const id = this.favoritesService.addAlbum(params.id);
    if (id === null) throw new UnprocessableEntityException();
    return id;
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param() params: AlbumIdParams) {
    const id = this.favoritesService.removeAlbum(params.id);
    if (id === null) throw new NotFoundException();
  }

  @Post('track/:id')
  addTrack(@Param() params: TrackIdParams): Track['id'] {
    const id = this.favoritesService.addTrack(params.id);
    if (id === null) throw new UnprocessableEntityException();
    return id;
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param() params: TrackIdParams) {
    const id = this.favoritesService.removeTrack(params.id);
    if (id === null) throw new NotFoundException();
  }
}
