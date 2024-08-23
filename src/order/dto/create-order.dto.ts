import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsUUID('4')
  customerId: string;

  @IsUUID('4')
  mealId: string;

  @IsUUID('4')
  addonId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsUUID('4')
  brandId: string;
}
