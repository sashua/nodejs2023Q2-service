import { Injectable } from '@nestjs/common';
import { Album, Artist, Favorites, Track, User } from './interfaces';
import { InmemoryTable } from './lib/inmemory-table';

@Injectable()
export class DbService {
  public user = new InmemoryTable<User>();
  public track = new InmemoryTable<Track>();
  public album = new InmemoryTable<Album>();
  public artist = new InmemoryTable<Artist>();
  public favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
