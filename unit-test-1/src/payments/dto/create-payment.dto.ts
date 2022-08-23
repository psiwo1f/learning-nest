import { IsNotEmpty, IsNumberString, IsString } from "class-validator"

export class CreatePaymentDto {

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    // @IsNumberString
    price: number
}