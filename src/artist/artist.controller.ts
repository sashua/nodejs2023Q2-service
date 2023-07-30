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
import { Artist } from 'src/db/interfaces';
import { ArtistService } from './artist.service';
import { ArtistIdParams } from './dto/artist-id.params';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Artist {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll(): Artist[] {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: ArtistIdParams): Artist {
    const artist = this.artistService.findOne(id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  @Put(':id')
  update(
    @Param() { id }: ArtistIdParams,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = this.artistService.update(id, updateArtistDto);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: ArtistIdParams) {
    const artist = this.artistService.remove(id);
    if (!artist) throw new NotFoundException();
  }
}
