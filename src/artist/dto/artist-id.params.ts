import { IsUUID } from 'class-validator';
import { Artist } from '../../db/interfaces';

export class ArtistIdParams implements Pick<Artist, 'id'> {
  @IsUUID(4)
  id: Artist['id'];
}
