import { Injectable } from '@nestjs/common';
import { Meal } from './meal.model';
import { CreateMealDto, UpdateMealDto } from './dto';

@Injectable()
export class MealService {
  async createMeal(dto: CreateMealDto) {
    return Meal.query().insert(dto);
  }

  async getMealById(id: string) {
    return Meal.query().findById(id).withGraphFetched('brand');
  }

  async updateMeal(id: string, dto: UpdateMealDto) {
    return Meal.query().patchAndFetchById(id, dto);
  }

  async deleteMeal(id: string) {
    return Meal.query().deleteById(id);
  }

  async getAllMeals(page: number = 1, pageSize: number = 10) {
    return Meal.query()
      .withGraphFetched('brand')
      .page(page - 1, pageSize);
  }
}
