import { Injectable } from '@nestjs/common';
import { Brand } from './brand.model';
import { CreateBrandDto, UpdateBrandDto } from './dto';
import { ErrorHelper } from '../libs/utils/error.utils';

@Injectable()
export class BrandService {
  async createBrand(dto: CreateBrandDto): Promise<Brand> {
    return Brand.query().insert(dto);
  }

  async getBrandById(id: string): Promise<Brand> {
    const brand = await Brand.query().findById(id);
    if (!brand) {
      ErrorHelper.NotFoundException(`Brand not found`);
    }
    return brand;
  }

  async updateBrand(id: string, dto: UpdateBrandDto): Promise<Brand> {
    const updatedBrand = await Brand.query().patchAndFetchById(id, dto);
    if (!updatedBrand) {
      ErrorHelper.NotFoundException(`Brand not found`);
    }
    return updatedBrand;
  }

  async deleteBrand(id: string): Promise<number> {
    const deletedCount = await Brand.query().deleteById(id);
    if (deletedCount === 0) {
      ErrorHelper.NotFoundException(`Brand not found`);
    }
    return deletedCount;
  }

  async getAllBrands(page: number = 1, pageSize: number = 10) {
    return Brand.query().page(page - 1, pageSize);
  }
}
