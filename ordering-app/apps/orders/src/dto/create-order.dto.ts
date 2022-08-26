import {
  IsNotEmpty,
  IsString,
  IsPositive,
  IsPhoneNumber,
} from 'class-validator';
export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsPositive()
  price: number;

  @IsPhoneNumber()
  phoneNumber: string;
}
