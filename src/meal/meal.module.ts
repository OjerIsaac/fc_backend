import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { Meal } from './meal.model';

@Module({
  imports: [ObjectionModule.forFeature([Meal])],
  providers: [MealService],
  controllers: [MealController],
})
export class MealModule {}
