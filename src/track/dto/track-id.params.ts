import { IsUUID } from 'class-validator';
import { Track } from '../../db/interfaces';

export class TrackIdParams implements Pick<Track, 'id'> {
  @IsUUID(4)
  id: Track['id'];
}
