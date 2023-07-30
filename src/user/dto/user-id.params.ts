import { IsUUID } from 'class-validator';
import { User } from '../../db/interfaces';

export class UserIdParams implements Pick<User, 'id'> {
  @IsUUID(4)
  id: User['id'];
}
