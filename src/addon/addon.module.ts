import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { AddonService } from './addon.service';
import { AddonController } from './addon.controller';
import { Addon } from './addon.model';

@Module({
  imports: [ObjectionModule.forFeature([Addon])],
  providers: [AddonService],
  controllers: [AddonController],
})
export class AddonModule {}
