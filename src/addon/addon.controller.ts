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
import { AddonService } from './addon.service';
import { validateUUID } from '../libs/helpers';
import { HttpResponse, ErrorHelper } from '../libs/utils';
import { CreateAddonDto, UpdateAddonDto } from './dto';
import { AuthGuard, RoleGuard } from '../guards';

@UseGuards(AuthGuard, RoleGuard)
@Controller('addons')
export class AddonController {
  constructor(private readonly addonService: AddonService) {}

  @Post()
  async createAddon(@Body() dto: CreateAddonDto) {
    const data = await this.addonService.createAddon(dto);

    return HttpResponse.success({
      data,
      message: 'Addon added successfully',
      statusCode: HttpStatus.CREATED,
    });
  }

  @Get(':id')
  async getAddonById(@Param('id') id: string) {
    if (!validateUUID(id)) {
      ErrorHelper.BadRequestException('Invalid ID');
    }

    const data = await this.addonService.getAddonById(id);

    return HttpResponse.success({
      data,
      message: 'Addon fetched successfully',
      statusCode: HttpStatus.OK,
    });
  }

  @Put(':id')
  async updateAddon(@Param('id') id: string, @Body() dto: UpdateAddonDto) {
    if (!validateUUID(id)) {
      ErrorHelper.BadRequestException('Invalid ID');
    }

    const data = await this.addonService.updateAddon(id, dto);

    return HttpResponse.success({
      data,
      message: 'Addon updated successfully',
      statusCode: HttpStatus.OK,
    });
  }

  @Delete(':id')
  async deleteAddon(@Param('id') id: string) {
    if (!validateUUID(id)) {
      ErrorHelper.BadRequestException('Invalid ID');
    }

    await this.addonService.deleteAddon(id);

    return HttpResponse.success({
      message: 'Addon deleted successfully',
      statusCode: HttpStatus.OK,
    });
  }

  @Get()
  async getAllAddons(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    const data = await this.addonService.getAllAddons(page, pageSize);

    return HttpResponse.success({
      data,
      message: 'Addon fetched successfully',
      statusCode: HttpStatus.OK,
    });
  }
}
