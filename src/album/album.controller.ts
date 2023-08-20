import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Album } from '@prisma/client';
import { AlbumService } from './album.service';
import { AlbumIdParams } from './dto/album-id.params';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: AlbumIdParams): Promise<Album> {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  update(
    @Param() { id }: AlbumIdParams,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() { id }: AlbumIdParams): Promise<void> {
    await this.albumService.remove(id);
  }
}
