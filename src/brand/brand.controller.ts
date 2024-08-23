import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto, UpdateBrandDto } from './dto';
import { HttpResponse, ErrorHelper } from '../libs/utils';
import { validateUUID } from '../libs/helpers';
import { AuthGuard, RoleGuard } from '../guards';

@UseGuards(AuthGuard, RoleGuard)
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
    if (!validateUUID(id)) {
      ErrorHelper.BadRequestException('Invalid ID');
    }

    const data = await this.brandService.getBrandById(id);

    return HttpResponse.success({
      data,
      message: 'Brand fetched successfully',
      statusCode: HttpStatus.OK,
    });
  }

  @Put(':id')
  async updateBrand(@Param('id') id: string, @Body() dto: UpdateBrandDto) {
    if (!validateUUID(id)) {
      ErrorHelper.BadRequestException('Invalid ID');
    }

    const data = await this.brandService.updateBrand(id, dto);

    return HttpResponse.success({
      data,
      message: 'Brand updated successfully',
      statusCode: HttpStatus.OK,
    });
  }

  @Delete(':id')
  async deleteBrand(@Param('id') id: string): Promise<void> {
    if (!validateUUID(id)) {
      ErrorHelper.BadRequestException('Invalid ID');
    }

    await this.brandService.deleteBrand(id);

    return HttpResponse.success({
      message: 'Brand deleted successfully',
      statusCode: HttpStatus.OK,
    });
  }

  @Get()
  async getAllBrands(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    const data = await this.brandService.getAllBrands(page, pageSize);

    return HttpResponse.success({
      data,
      message: 'Brand fetched successfully',
      statusCode: HttpStatus.OK,
    });
  }
}
