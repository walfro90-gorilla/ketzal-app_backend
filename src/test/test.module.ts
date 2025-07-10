import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TestController],
  providers: [PrismaService],
})
export class TestModule {}
