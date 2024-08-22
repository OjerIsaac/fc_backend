import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { Brand } from './brand.model';

@Module({
  imports: [ObjectionModule.forFeature([Brand])],
  providers: [BrandService],
  controllers: [BrandController],
})
export class BrandModule {}
