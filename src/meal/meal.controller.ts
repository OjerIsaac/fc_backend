import { Controller, Post, Get, Put, Delete, Param, Body, Query, HttpStatus } from '@nestjs/common';
import { MealService } from './meal.service';
import { HttpResponse, ErrorHelper } from '../libs/utils';
import { CreateMealDto, UpdateMealDto } from './dto';
import { validateUUID } from '../libs/helpers';

@Controller('meals')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  async createMeal(@Body() dto: CreateMealDto) {
    const data = await this.mealService.createMeal(dto);

    return HttpResponse.success({
      data,
      message: 'Meal added successfully',
      statusCode: HttpStatus.CREATED,
    });
  }

  @Get(':id')
  async getMealById(@Param('id') id: string) {
    if (!validateUUID(id)) {
      ErrorHelper.BadRequestException('Invalid ID');
    }
    const data = await this.mealService.getMealById(id);

    return HttpResponse.success({
      data,
      message: 'Meal fetched successfully',
      statusCode: HttpStatus.OK,
    });
  }

  @Put(':id')
  async updateMeal(@Param('id') id: string, @Body() dto: UpdateMealDto) {
    if (!validateUUID(id)) {
      ErrorHelper.BadRequestException('Invalid ID');
    }

    const data = await this.mealService.updateMeal(id, dto);

    return HttpResponse.success({
      data,
      message: 'Meal updated successfully',
      statusCode: HttpStatus.OK,
    });
  }

  @Delete(':id')
  async deleteMeal(@Param('id') id: string): Promise<void> {
    if (!validateUUID(id)) {
      ErrorHelper.BadRequestException('Invalid ID');
    }

    await this.mealService.deleteMeal(id);

    return HttpResponse.success({
      message: 'Meal deleted successfully',
      statusCode: HttpStatus.OK,
    });
  }

  @Get()
  async getAllMeals(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    const data = await this.mealService.getAllMeals(page, pageSize);

    return HttpResponse.success({
      data,
      message: 'Meal fetched successfully',
      statusCode: HttpStatus.OK,
    });
  }
}
