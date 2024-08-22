import { Controller, Post, Get, Put, Delete, Param, Body, Query, HttpStatus } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto, UpdateBrandDto } from './dto';
import { HttpResponse } from '../libs/utils';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async createBrand(@Body() dto: CreateBrandDto) {
    const data = await this.brandService.createBrand(dto);

    return HttpResponse.success({
      data,
      message: 'Brand added successfully',
      statusCode: HttpStatus.CREATED,
    });
  }

  @Get(':id')
  async getBrandById(@Param('id') id: string) {
    const data = await this.brandService.getBrandById(id);

    return HttpResponse.success({
      data,
      message: 'Brand fetched successfully',
      statusCode: HttpStatus.CREATED,
    });
  }

  @Put(':id')
  async updateBrand(@Param('id') id: string, @Body() dto: UpdateBrandDto) {
    const data = await this.brandService.updateBrand(id, dto);

    return HttpResponse.success({
      data,
      message: 'Brand updated successfully',
      statusCode: HttpStatus.CREATED,
    });
  }

  @Delete(':id')
  async deleteBrand(@Param('id') id: string): Promise<void> {
    await this.brandService.deleteBrand(id);

    return HttpResponse.success({
      message: 'Brand deleted successfully',
      statusCode: HttpStatus.CREATED,
    });
  }

  @Get()
  async getAllBrands(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    const data = await this.brandService.getAllBrands(page, pageSize);

    return HttpResponse.success({
      data,
      message: 'Brand added successfully',
      statusCode: HttpStatus.CREATED,
    });
  }
}
