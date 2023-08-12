import { Exclude } from 'class-transformer';
import { User } from 'src/db/interfaces';

export class UserEntity implements User {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
