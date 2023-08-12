import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Album, Artist, Track } from 'src/db/interfaces';
import { FavoritesResponse } from './interfaces';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: DbService) {}

  getAll(): FavoritesResponse {
    const { artists, albums, tracks } = this.db.favorites;
    return {
      artists: artists.map((id) => this.db.artist.find(id)),
      albums: albums.map((id) => this.db.album.find(id)),
      tracks: tracks.map((id) => this.db.track.find(id)),
    };
  }

  addArtist(id: Artist['id']): Artist['id'] | null {
    return this.addFavorite<Artist>(id, 'artist');
  }

  removeArtist(id: Artist['id']): Artist['id'] | null {
    return this.removeFavorite<Artist>(id, 'artist');
  }

  addAlbum(id: Album['id']): Album['id'] | null {
    return this.addFavorite<Album>(id, 'album');
  }

  removeAlbum(id: Album['id']): Album['id'] | null {
    return this.removeFavorite<Album>(id, 'album');
  }

  addTrack(id: Track['id']): Track['id'] | null {
    return this.addFavorite<Track>(id, 'track');
  }

  removeTrack(id: Track['id']): Track['id'] | null {
    return this.removeFavorite<Track>(id, 'track');
  }

  // ----------------------------------------------------------------
  private addFavorite<T extends Artist | Album | Track>(
    id: T['id'],
    collection: keyof Omit<DbService, 'favorites'>,
  ): T['id'] | null {
    const item = this.db[collection].find(id);
    if (!item) return null;
    const items = this.db.favorites[collection + 's'] as T['id'][];
    const alreadyAdded = items.find((itemId) => itemId === id);
    if (!alreadyAdded) items.push(id);
    return id;
  }

  private removeFavorite<T extends Artist | Album | Track>(
    id: T['id'],
    collection: keyof Omit<DbService, 'favorites'>,
  ): T['id'] | null {
    const items = this.db.favorites[collection + 's'] as T['id'][];
    const itemIndex = items.findIndex((itemId) => itemId === id);
    if (itemIndex < 0) return null;
    items.splice(itemIndex, 1);
    return id;
  }
}
