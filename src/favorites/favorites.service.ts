import { Injectable } from '@nestjs/common';
import { Album, Artist, Track } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { FavoritesResponse } from './interfaces';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: DbService) {}

  async getFavorites(): Promise<FavoritesResponse> {
    const [artists, albums, tracks] = await this.db.$transaction([
      this.db.favoriteArtist.findMany({ include: { item: true } }),
      this.db.favoriteAlbum.findMany({ include: { item: true } }),
      this.db.favoriteTrack.findMany({ include: { item: true } }),
    ]);
    return {
      artists: artists.map(({ item }) => item),
      albums: albums.map(({ item }) => item),
      tracks: tracks.map(({ item }) => item),
    };
  }

  async addArtist(id: Artist['id']): Promise<Artist> {
    const result = await this.db.favoriteArtist.upsert({
      where: { id },
      create: { id },
      update: { id },
      include: { item: true },
    });
    return result.item;
  }

  async addAlbum(id: Album['id']): Promise<Album> {
    const result = await this.db.favoriteAlbum.upsert({
      where: { id },
      create: { id },
      update: { id },
      include: { item: true },
    });
    return result.item;
  }

  async addTrack(id: Track['id']): Promise<Track> {
    const result = await this.db.favoriteTrack.upsert({
      where: { id },
      create: { id },
      update: { id },
      include: { item: true },
    });
    return result.item;
  }

  async removeArtist(id: Artist['id']): Promise<Artist> {
    const result = await this.db.favoriteArtist.delete({
      where: { id },
      include: { item: true },
    });
    return result.item;
  }

  async removeAlbum(id: Album['id']): Promise<Album> {
    const result = await this.db.favoriteAlbum.delete({
      where: { id },
      include: { item: true },
    });
    return result.item;
  }

  async removeTrack(id: Track['id']): Promise<Track> {
    const result = await this.db.favoriteTrack.delete({
      where: { id },
      include: { item: true },
    });
    return result.item;
  }
}
