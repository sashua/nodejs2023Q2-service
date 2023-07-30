import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, DbModule, TrackModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
