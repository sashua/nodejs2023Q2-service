import { Module } from '@nestjs/common';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { DbModule } from './db/db.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, DbModule, TrackModule, ArtistModule, AlbumModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
