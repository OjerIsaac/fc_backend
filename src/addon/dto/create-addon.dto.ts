import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateAddonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsUUID('4')
  mealId: string;
}
