import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { Meal } from './meal.model';
import { CreateMealDto, UpdateMealDto } from './dto';
import { ErrorHelper } from '../libs/utils';
import { Brand } from '../brand/brand.model';

@Injectable()
export class MealService {
  constructor(@Inject('KnexConnection') private knex: Knex) {}

  async createMeal(dto: CreateMealDto): Promise<Meal> {
    const brand = await Brand.query().findById(dto.brandId);
    if (!brand) {
      ErrorHelper.NotFoundException(`Brand not found`);
    }

    return Meal.query().insert(dto);
  }

  async getMealById(id: string): Promise<Meal> {
    const meal = await this.knex('meals')
      .select(
        'meals.*',
        this.knex.raw('json_agg(distinct addons.*) as addons'),
        'brands.id as brand_id',
        'brands.name as brand_name'
      )
      .leftJoin('addons', 'meals.id', 'addons.mealId')
      .leftJoin('brands', 'meals.brandId', 'brands.id')
      .where('meals.id', id)
      .groupBy('meals.id', 'brands.id')
      .first();

    if (!meal) {
      ErrorHelper.NotFoundException(`Meal not found`);
    }

    return meal;
  }

  async updateMeal(id: string, dto: UpdateMealDto): Promise<Meal> {
    const updatedMeal = await Meal.query().patchAndFetchById(id, dto);
    if (!updatedMeal) {
      ErrorHelper.NotFoundException(`Meal not found`);
    }
    return updatedMeal;
  }

  async deleteMeal(id: string): Promise<number> {
    const deletedCount = await Meal.query().deleteById(id);
    if (deletedCount === 0) {
      ErrorHelper.NotFoundException(`Brand not found`);
    }
    return deletedCount;
  }

  async getAllMeals(page: number = 1, pageSize: number = 10) {
    const offset = (page - 1) * pageSize;

    const meals = await this.knex('meals')
      .select(
        'meals.*',
        this.knex.raw('json_agg(distinct addons.*) as addons'),
        'brands.id as brand_id',
        'brands.name as brand_name'
      )
      .leftJoin('addons', 'meals.id', 'addons.mealId')
      .leftJoin('brands', 'meals.brandId', 'brands.id')
      .groupBy('meals.id', 'brands.id')
      .limit(pageSize)
      .offset(offset);

    return meals;
  }
}
