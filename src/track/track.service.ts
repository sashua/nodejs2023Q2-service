import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Track } from 'src/db/interfaces';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly db: DbService) {}

  create(createTrackDto: CreateTrackDto): Track {
    return this.db.track.create(createTrackDto);
  }

  findAll(): Track[] {
    return this.db.track.findAll();
  }

  findOne(id: Track['id']): Track | null {
    return this.db.track.find(id);
  }

  update(id: Track['id'], updateTrackDto: UpdateTrackDto): Track | null {
    return this.db.track.update(id, updateTrackDto);
  }

  remove(id: Track['id']): Track | null {
    this.db.favorites.tracks = this.db.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
    return this.db.track.delete(id);
  }
}
