import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from './dto';
import { TracksService } from './tracks.service';

@Controller('tracks')
export class TracksController {
    constructor(private tracksService: TracksService) {}

    @Get()
    getTracks(trackerId: string) {
        return this.tracksService.getTracks(trackerId)
    }

    @Get(':id')
    getTrackById(@Param('id') trackId: string) {
        return this.tracksService.getTrackById(trackId)
    }

    @Post()
    createTrack(@Body() dto: CreateTrackDto) {
        return this.tracksService.createTrack('', dto)
    }

    @Patch(':id')
    updateTrack(@Param('id') trackId: string, @Body() dto: UpdateTrackDto) {
        return this.tracksService.updateTrack('', trackId, dto)
    }
}
