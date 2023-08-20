import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Artist } from '@prisma/client';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { ArtistService } from './artist.service';
import { ArtistIdParams } from './dto/artist-id.params';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@UseGuards(AccessGuard)
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: ArtistIdParams): Promise<Artist> {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  update(
    @Param() { id }: ArtistIdParams,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() { id }: ArtistIdParams): Promise<void> {
    await this.artistService.remove(id);
  }
}
