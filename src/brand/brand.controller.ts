import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { Brand } from './brand.model';
import { BrandService } from './brand.service';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async createBrand(@Body() brandData: Partial<Brand>): Promise<Brand> {
    return this.brandService.createBrand(brandData);
  }

  @Get(':id')
  async getBrandById(@Param('id') id: number): Promise<Brand> {
    return this.brandService.getBrandById(id);
  }

  @Put(':id')
  async updateBrand(@Param('id') id: number, @Body() brandData: Partial<Brand>): Promise<Brand> {
    return this.brandService.updateBrand(id, brandData);
  }

  @Delete(':id')
  async deleteBrand(@Param('id') id: number): Promise<void> {
    await this.brandService.deleteBrand(id);
  }

  @Get()
  async getAllBrands(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10) {
    return this.brandService.getAllBrands(page, pageSize);
  }
}
