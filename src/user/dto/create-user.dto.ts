import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../db/interfaces';

export class CreateUserDto implements Pick<User, 'login' | 'password'> {
  @IsString()
  @IsNotEmpty()
  login: User['login'];

  @IsString()
  @IsNotEmpty()
  password: User['password'];
}
