import { Injectable } from '@nestjs/common';
import { Addon } from './addon.model';
import { CreateAddonDto, UpdateAddonDto } from './dto';
import { ErrorHelper } from '../libs/utils';
import { Meal } from '../meal/meal.model';

@Injectable()
export class AddonService {
  async createAddon(dto: CreateAddonDto): Promise<Addon> {
    const meal = await Meal.query().findById(dto.mealId);
    if (!meal) {
      ErrorHelper.NotFoundException(`Meal not found`);
    }

    return Addon.query().insert(dto);
  }

  async getAddonById(id: string): Promise<Addon> {
    const addon = await Addon.query().findById(id).withGraphFetched('meal');
    if (!addon) {
      ErrorHelper.NotFoundException(`Addon not found`);
    }
    return addon;
  }

  async updateAddon(id: string, dto: UpdateAddonDto): Promise<Addon> {
    const updatedAddon = await Addon.query().patchAndFetchById(id, dto);
    if (!updatedAddon) {
      ErrorHelper.NotFoundException(`Addon not found`);
    }
    return updatedAddon;
  }

  async deleteAddon(id: string): Promise<number> {
    const deletedCount = await Addon.query().deleteById(id);
    if (deletedCount === 0) {
      ErrorHelper.NotFoundException(`Addon not found`);
    }
    return deletedCount;
  }

  async getAllAddons(page: number = 1, pageSize: number = 10) {
    return Addon.query()
      .withGraphFetched('meal')
      .page(page - 1, pageSize);
  }
}
