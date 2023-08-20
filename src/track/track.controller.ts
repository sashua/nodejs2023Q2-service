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
import { Track } from '@prisma/client';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackIdParams } from './dto/track-id.params';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll(): Promise<Track[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: TrackIdParams): Promise<Track> {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  update(
    @Param() { id }: TrackIdParams,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() { id }: TrackIdParams): Promise<void> {
    await this.trackService.remove(id);
  }
}
