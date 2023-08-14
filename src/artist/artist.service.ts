import { Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DbService) {}

  create(data: CreateArtistDto): Promise<Artist> {
    return this.db.artist.create({ data });
  }

  findAll(): Promise<Artist[]> {
    return this.db.artist.findMany();
  }

  findOne(id: Artist['id']): Promise<Artist> {
    return this.db.artist.findUniqueOrThrow({ where: { id } });
  }

  update(id: Artist['id'], data: UpdateArtistDto): Promise<Artist> {
    return this.db.artist.update({ where: { id }, data });
  }

  remove(id: Artist['id']): Promise<Artist> {
    return this.db.artist.delete({ where: { id } });
  }
}
