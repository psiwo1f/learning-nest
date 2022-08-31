import { IsDateString, IsNotEmpty, IsString } from "class-validator"

export class UpdateTrackDto {
        @IsString()
        title?: string
    
        @IsString()
        description?: string

        @IsString()
        trackerId?: string
    
        @IsDateString()
        date?: string
}