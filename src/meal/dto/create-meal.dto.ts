import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateMealDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsUUID('4')
  brandId: string;
}
