import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiResponse({ status: 201, description: 'Notification created successfully' })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiResponse({ status: 200, description: 'List of all notifications' })
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get notifications for a specific user' })
  @ApiQuery({ name: 'includeRead', required: false, type: 'boolean' })
  @ApiResponse({ status: 200, description: 'User notifications' })
  findByUserId(
    @Param('userId') userId: string,
    @Query('includeRead') includeRead?: string
  ) {
    const includeReadBoolean = includeRead === 'false' ? false : true;
    return this.notificationsService.findByUserId(userId, includeReadBoolean);
  }

  @Get('user/:userId/stats')
  @ApiOperation({ summary: 'Get notification statistics for a user' })
  @ApiResponse({ status: 200, description: 'Notification statistics' })
  getNotificationStats(@Param('userId') userId: string) {
    return this.notificationsService.getNotificationStats(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a notification by ID' })
  @ApiResponse({ status: 200, description: 'Notification found' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a notification' })
  @ApiResponse({ status: 200, description: 'Notification updated successfully' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @Patch(':id/mark-read')
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiResponse({ status: 200, description: 'Notification marked as read' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Patch('user/:userId/mark-all-read')
  @ApiOperation({ summary: 'Mark all notifications as read for a user' })
  @ApiResponse({ status: 200, description: 'All notifications marked as read' })
  markAllAsReadForUser(@Param('userId') userId: string) {
    return this.notificationsService.markAllAsReadForUser(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiResponse({ status: 200, description: 'Notification deleted successfully' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }

  @Delete('user/:userId/read')
  @ApiOperation({ summary: 'Delete all read notifications for a user' })
  @ApiResponse({ status: 200, description: 'Read notifications deleted successfully' })
  removeReadNotificationsForUser(@Param('userId') userId: string) {
    return this.notificationsService.removeReadNotificationsForUser(userId);
  }

  @Post('quick')
  @ApiOperation({ summary: 'Create a quick notification' })
  @ApiResponse({ status: 201, description: 'Quick notification created' })
  createQuickNotification(@Body() body: {
    userId: string;
    title: string;
    message: string;
    type?: string;
  }) {
    return this.notificationsService.createQuickNotification(
      body.userId,
      body.title,
      body.message,
      body.type
    );
  }
}
