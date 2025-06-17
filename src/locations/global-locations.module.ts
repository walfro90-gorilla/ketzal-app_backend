import { Module } from '@nestjs/common';
import { GlobalLocationsService } from './global-locations.service';
import { GlobalLocationsController } from './global-locations.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GlobalLocationsController],
  providers: [GlobalLocationsService, PrismaService],
})
export class GlobalLocationsModule {}
