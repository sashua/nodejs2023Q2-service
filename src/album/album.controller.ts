import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Album } from 'src/db/interfaces';
import { AlbumService } from './album.service';
import { AlbumIdParams } from './dto/album-id.params';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): Album {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll(): Album[] {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: AlbumIdParams): Album {
    const album = this.albumService.findOne(id);
    if (!album) throw new NotFoundException();
    return album;
  }

  @Put(':id')
  update(
    @Param() { id }: AlbumIdParams,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = this.albumService.update(id, updateAlbumDto);
    if (!album) throw new NotFoundException();
    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: AlbumIdParams) {
    const album = this.albumService.remove(id);
    if (!album) throw new NotFoundException();
  }
}
