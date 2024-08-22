import { Injectable } from '@nestjs/common';
import { Brand } from './brand.model';

@Injectable()
export class BrandService {
  async createBrand(brandData: Partial<Brand>): Promise<Brand> {
    return Brand.query().insert(brandData);
  }

  async getBrandById(id: number): Promise<Brand> {
    return Brand.query().findById(id);
  }

  async updateBrand(id: number, brandData: Partial<Brand>): Promise<Brand> {
    return Brand.query().patchAndFetchById(id, brandData);
  }

  async deleteBrand(id: number): Promise<number> {
    return Brand.query().deleteById(id);
  }

  async getAllBrands(page: number = 1, pageSize: number = 10) {
    return Brand.query().page(page - 1, pageSize);
  }
}
