import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { PlannersService } from './planners.service';
import { CreatePlannerDto } from './dto/create-planner.dto';
import { UpdatePlannerDto } from './dto/update-planner.dto';
import { AddItemToPlannerDto } from './dto/add-item-to-planner.dto';

// Nota: Asumiendo que hay un AuthGuard configurado
// import { AuthGuard } from '../auth/auth.guard';

@Controller('planners')
// @UseGuards(AuthGuard) // Descomenta cuando tengas el guard configurado
export class PlannersController {
  constructor(private readonly plannersService: PlannersService) {}

  // 📝 Crear nuevo planner
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPlanner(@Body() createPlannerDto: CreatePlannerDto, @Request() req: any) {
    // Por ahora, usando un userId de prueba. En producción, obtener del token JWT
    const userId = req.user?.id || 'test-user-id';
    
    const planner = await this.plannersService.createPlanner(userId, createPlannerDto);
    
    return {
      success: true,
      message: 'Planner created successfully',
      data: planner,
    };
  }

  // 📋 Obtener todos los planners del usuario
  @Get()
  async getUserPlanners(@Request() req: any) {
    const userId = req.user?.id || 'test-user-id';
    
    const planners = await this.plannersService.getPlannersByUser(userId);
    
    return {
      success: true,
      message: 'Planners retrieved successfully',
      data: planners,
    };
  }

  // 🔍 Obtener planner específico
  @Get(':id')
  async getPlannerById(@Param('id') id: string, @Request() req: any) {
    const userId = req.user?.id || 'test-user-id';
    
    const planner = await this.plannersService.getPlannerById(id, userId);
    
    return {
      success: true,
      message: 'Planner retrieved successfully',
      data: planner,
    };
  }

  // ✏️ Actualizar planner
  @Patch(':id')
  async updatePlanner(
    @Param('id') id: string,
    @Body() updatePlannerDto: UpdatePlannerDto,
    @Request() req: any,
  ) {
    const userId = req.user?.id || 'test-user-id';
    
    const updatedPlanner = await this.plannersService.updatePlanner(id, userId, updatePlannerDto);
    
    return {
      success: true,
      message: 'Planner updated successfully',
      data: updatedPlanner,
    };
  }

  // 🗑️ Eliminar planner
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePlanner(@Param('id') id: string, @Request() req: any) {
    const userId = req.user?.id || 'test-user-id';
    
    await this.plannersService.deletePlanner(id, userId);
    
    return {
      success: true,
      message: 'Planner deleted successfully',
    };
  }

  // ➕ Agregar item al planner
  @Post('items')
  @HttpCode(HttpStatus.CREATED)
  async addItemToPlanner(@Body() addItemDto: AddItemToPlannerDto, @Request() req: any) {
    const userId = req.user?.id || 'test-user-id';
    
    const item = await this.plannersService.addItemToPlanner(addItemDto, userId);
    
    return {
      success: true,
      message: 'Item added to planner successfully',
      data: item,
    };
  }

  // 🗑️ Remover item del planner
  @Delete('items/:itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeItemFromPlanner(@Param('itemId') itemId: string, @Request() req: any) {
    const userId = req.user?.id || 'test-user-id';
    
    await this.plannersService.removeItemFromPlanner(itemId, userId);
    
    return {
      success: true,
      message: 'Item removed from planner successfully',
    };
  }

  // 📊 Obtener estadísticas del planner
  @Get(':id/stats')
  async getPlannerStats(@Param('id') id: string, @Request() req: any) {
    const userId = req.user?.id || 'test-user-id';
    
    const stats = await this.plannersService.getPlannerStats(id, userId);
    
    return {
      success: true,
      message: 'Planner statistics retrieved successfully',
      data: stats,
    };
  }
}
