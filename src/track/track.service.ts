import { Injectable } from '@nestjs/common';
import { Track } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly db: DbService) {}

  create(data: CreateTrackDto): Promise<Track> {
    return this.db.track.create({ data });
  }

  findAll(): Promise<Track[]> {
    return this.db.track.findMany();
  }

  findOne(id: Track['id']): Promise<Track> {
    return this.db.track.findUniqueOrThrow({ where: { id } });
  }

  update(id: Track['id'], data: UpdateTrackDto): Promise<Track> {
    return this.db.track.update({ where: { id }, data });
  }

  remove(id: Track['id']): Promise<Track> {
    return this.db.track.delete({ where: { id } });
  }
}
