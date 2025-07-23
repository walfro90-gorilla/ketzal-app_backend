import { Module } from '@nestjs/common';
import { PlannersService } from './planners.service';
import { PlannersController } from './planners.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PlannersController],
  providers: [PlannersService, PrismaService],
  exports: [PlannersService],
})
export class PlannersModule {}
