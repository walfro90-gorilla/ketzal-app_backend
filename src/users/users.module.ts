import { Module } from '@nestjs/common';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UsersController],
  imports: [NotificationsModule],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
