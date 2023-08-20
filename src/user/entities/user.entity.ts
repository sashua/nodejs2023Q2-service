import { User } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';

export class UserEntity implements User {
  id: string;
  login: string;
  version: number;

  @Transform(({ value }) => value.getTime())
  createdAt: Date;

  @Transform(({ value }) => value.getTime())
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
