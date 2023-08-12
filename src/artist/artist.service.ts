import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Artist } from 'src/db/interfaces';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DbService) {}

  create(createArtistDto: CreateArtistDto): Artist {
    return this.db.artist.create(createArtistDto);
  }

  findAll(): Artist[] {
    return this.db.artist.findAll();
  }

  findOne(id: Artist['id']): Artist | null {
    return this.db.artist.find(id);
  }

  update(id: Artist['id'], updateArtistDto: UpdateArtistDto): Artist | null {
    return this.db.artist.update(id, updateArtistDto);
  }

  remove(id: Artist['id']): Artist | null {
    const albums = this.db.album.findMany('artistId', id);
    albums.forEach(({ id }) => this.db.album.update(id, { artistId: null }));
    const tracks = this.db.track.findMany('artistId', id);
    tracks.forEach(({ id }) => this.db.track.update(id, { artistId: null }));
    this.db.favorites.artists = this.db.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
    return this.db.artist.delete(id);
  }
}
