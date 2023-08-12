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
import { Track } from 'src/db/interfaces';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackIdParams } from './dto/track-id.params';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto): Track {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll(): Track[] {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: TrackIdParams): Track {
    const track = this.trackService.findOne(id);
    if (!track) throw new NotFoundException();
    return track;
  }

  @Put(':id')
  update(
    @Param() { id }: TrackIdParams,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = this.trackService.update(id, updateTrackDto);
    if (!track) throw new NotFoundException();
    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: TrackIdParams) {
    const track = this.trackService.remove(id);
    if (!track) throw new NotFoundException();
  }
}
