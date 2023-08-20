import { User } from '@prisma/client';
import { IsUUID } from 'class-validator';

export class UserIdParams implements Pick<User, 'id'> {
  @IsUUID(4)
  id: User['id'];
}
