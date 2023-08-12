import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Album } from 'src/db/interfaces';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DbService) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    return this.db.album.create(createAlbumDto);
  }

  findAll(): Album[] {
    return this.db.album.findAll();
  }

  findOne(id: Album['id']): Album | null {
    return this.db.album.find(id);
  }

  update(id: Album['id'], updateAlbumDto: UpdateAlbumDto): Album | null {
    return this.db.album.update(id, updateAlbumDto);
  }

  remove(id: Album['id']): Album | null {
    const tracks = this.db.track.findMany('albumId', id);
    tracks.forEach(({ id }) => this.db.track.update(id, { albumId: null }));
    this.db.favorites.albums = this.db.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
    return this.db.album.delete(id);
  }
}
