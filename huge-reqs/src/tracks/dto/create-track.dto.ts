import { IsDateString, IsNotEmpty, IsString } from "class-validator"

export class CreateTrackDto {

    @IsNotEmpty()
    @IsString()
    title: string

    @IsString()
    description?: string

    @IsNotEmpty()
    @IsString()
    trackerId: string

    @IsDateString()
    date: string
}