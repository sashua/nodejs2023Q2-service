import { Album, Artist, Track } from 'src/db/interfaces';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
