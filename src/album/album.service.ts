import { Injectable } from '@nestjs/common';
import { Album } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DbService) {}

  create(data: CreateAlbumDto): Promise<Album> {
    return this.db.album.create({ data });
  }

  findAll(): Promise<Album[]> {
    return this.db.album.findMany();
  }

  findOne(id: Album['id']): Promise<Album> {
    return this.db.album.findUniqueOrThrow({ where: { id } });
  }

  update(id: Album['id'], data: UpdateAlbumDto): Promise<Album> {
    return this.db.album.update({ where: { id }, data });
  }

  remove(id: Album['id']): Promise<Album> {
    return this.db.album.delete({ where: { id } });
  }
}
