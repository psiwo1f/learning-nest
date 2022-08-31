import { Injectable } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from './dto';

@Injectable()
export class TracksService {

    async getTracks(trackerId: string = '') {
        console.log('trackerId', trackerId)
        return 'All tracks for a tracker'
    }

    async getTrackById(trackId: string) {
        console.log('trackId', trackId)
        return 'Track against a track id'
    }

    async createTrack(trackerId: string = '', dto: CreateTrackDto) {
        console.log('dto', dto)
        return 'Create a new track against a trackerID'
    }

    async updateTrack(trackerId: string = '', trackId: string, dto: UpdateTrackDto) {
        console.log('dto ', dto)
        return 'Update the track of enroute tracker'
    }

    async deleteTrack(trackId: string) {
        console.log('trackId ',trackId)
        return 'Delete the track'
    }
}
