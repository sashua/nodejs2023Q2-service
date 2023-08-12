import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Artist } from '../../db/interfaces';

export class CreateArtistDto implements Omit<Artist, 'id'> {
  @IsString()
  @IsNotEmpty()
  name: Artist['name'];

  @IsBoolean()
  grammy: Artist['grammy'];
}
