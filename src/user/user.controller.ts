import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIdParams } from './dto/user-id.params';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@UseGuards(AccessGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.create(createUserDto);
    return new UserEntity(user);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    const users = await this.userService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  async findOne(@Param() { id }: UserIdParams): Promise<UserEntity> {
    const user = await this.userService.findOne(id);
    return new UserEntity(user);
  }

  @Put(':id')
  async updatePassword(
    @Param() { id }: UserIdParams,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.userService.updatePassword(id, updatePasswordDto);
    if (!user) throw new ForbiddenException();
    return new UserEntity(user);
  }

  @Patch(':id')
  async updateUser(
    @Param() { id }: UserIdParams,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userService.updateUser(id, updateUserDto);
    return new UserEntity(user);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() { id }: UserIdParams): Promise<void> {
    await this.userService.remove(id);
  }
}
