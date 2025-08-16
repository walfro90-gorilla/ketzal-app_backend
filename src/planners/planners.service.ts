import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlannerDto, PlannerStatusDto } from './dto/create-planner.dto';
import { UpdatePlannerDto } from './dto/update-planner.dto';
import { AddItemToPlannerDto } from './dto/add-item-to-planner.dto';

@Injectable()
export class PlannersService {
  constructor(private readonly prisma: PrismaService) {}

  // 🔒 Crear planner (privado por defecto)
  async createPlanner(userId: string, createPlannerDto: CreatePlannerDto) {
    try {
      const planner = await this.prisma.travelPlanner.create({
        data: {
          userId,
          name: createPlannerDto.name,
          destination: createPlannerDto.destination,
          startDate: createPlannerDto.startDate ? new Date(createPlannerDto.startDate) : null,
          endDate: createPlannerDto.endDate ? new Date(createPlannerDto.endDate) : null,
          status: createPlannerDto.status || PlannerStatusDto.PLANNING,
          isPublic: createPlannerDto.isPublic || false,
          shareCode: createPlannerDto.shareCode,
          totalMXN: 0,
          totalAxo: 0,
        },
        include: {
          items: {
            include: {
              service: true,
              product: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return planner;
    } catch (error) {
      throw new BadRequestException('Error creating planner: ' + ((error as any).message || error));
    }
  }

  // 🔍 Obtener planners del usuario
  async getPlannersByUser(userId: string) {
    const planners = await this.prisma.travelPlanner.findMany({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            service: true,
            product: true,
          },
        },
        _count: {
          select: {
            items: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return planners;
  }

  // 📋 Obtener planner específico
  async getPlannerById(id: string, userId: string) {
    const planner = await this.prisma.travelPlanner.findFirst({
      where: {
        id,
        userId, // 🔒 Solo el propietario puede ver sus planners
      },
      include: {
        items: {
          include: {
            service: true,
            product: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!planner) {
      throw new NotFoundException('Planner not found or access denied');
    }

    return planner;
  }

  // ✏️ Actualizar planner
  async updatePlanner(id: string, userId: string, updatePlannerDto: UpdatePlannerDto) {
    // Verificar que el planner existe y pertenece al usuario
    const existingPlanner = await this.prisma.travelPlanner.findFirst({
      where: { id, userId },
    });

    if (!existingPlanner) {
      throw new NotFoundException('Planner not found or access denied');
    }

    try {
      const updatedPlanner = await this.prisma.travelPlanner.update({
        where: { id },
        data: {
          name: updatePlannerDto.name,
          destination: updatePlannerDto.destination,
          startDate: updatePlannerDto.startDate ? new Date(updatePlannerDto.startDate) : undefined,
          endDate: updatePlannerDto.endDate ? new Date(updatePlannerDto.endDate) : undefined,
          status: updatePlannerDto.status,
          isPublic: updatePlannerDto.isPublic,
          shareCode: updatePlannerDto.shareCode,
          updatedAt: new Date(),
        },
        include: {
          items: {
            include: {
              service: true,
              product: true,
            },
          },
        },
      });

      return updatedPlanner;
    } catch (error) {
      throw new BadRequestException('Error updating planner: ' + ((error as any).message || error));
    }
  }

  // 🗑️ Eliminar planner
  async deletePlanner(id: string, userId: string) {
    // Verificar que el planner existe y pertenece al usuario
    const existingPlanner = await this.prisma.travelPlanner.findFirst({
      where: { id, userId },
    });

    if (!existingPlanner) {
      throw new NotFoundException('Planner not found or access denied');
    }

    try {
      await this.prisma.travelPlanner.delete({
        where: { id },
      });

      return { message: 'Planner deleted successfully' };
    } catch (error) {
      throw new BadRequestException('Error deleting planner: ' + ((error as any).message || error));
    }
  }

  // ➕ Agregar item al planner
  async addItemToPlanner(addItemDto: AddItemToPlannerDto, userId: string) {
    // Verificar que el planner existe y pertenece al usuario
    const planner = await this.prisma.travelPlanner.findFirst({
      where: {
        id: addItemDto.plannerId,
        userId,
      },
    });

    if (!planner) {
      throw new NotFoundException('Planner not found or access denied');
    }

    // Verificar que al menos serviceId o productId esté presente
    if (!addItemDto.serviceId && !addItemDto.productId) {
      throw new BadRequestException('Either serviceId or productId is required');
    }

    try {
      const item = await this.prisma.plannerItem.create({
        data: {
          plannerId: addItemDto.plannerId,
          serviceId: addItemDto.serviceId,
          productId: addItemDto.productId,
          quantity: addItemDto.quantity,
          priceMXN: addItemDto.priceMXN,
          priceAxo: addItemDto.priceAxo,
          selectedDate: addItemDto.selectedDate ? new Date(addItemDto.selectedDate) : null,
          notes: addItemDto.notes,
        },
        include: {
          service: true,
          product: true,
          planner: true,
        },
      });

      // Actualizar totales del planner
      await this.updatePlannerTotals(addItemDto.plannerId);

      return item;
    } catch (error) {
      throw new BadRequestException('Error adding item to planner: ' + ((error as any).message || error));
    }
  }

  // 🗑️ Remover item del planner
  async removeItemFromPlanner(itemId: string, userId: string) {
    // Verificar que el item existe y el planner pertenece al usuario
    const item = await this.prisma.plannerItem.findFirst({
      where: {
        id: itemId,
        planner: {
          userId,
        },
      },
      include: {
        planner: true,
      },
    });

    if (!item) {
      throw new NotFoundException('Item not found or access denied');
    }

    try {
      await this.prisma.plannerItem.delete({
        where: { id: itemId },
      });

      // Actualizar totales del planner
      await this.updatePlannerTotals(item.plannerId);

      return { message: 'Item removed successfully' };
    } catch (error) {
      throw new BadRequestException('Error removing item: ' + ((error as any).message || error));
    }
  }

  // 🔄 Actualizar totales del planner
  private async updatePlannerTotals(plannerId: string) {
    const items = await this.prisma.plannerItem.findMany({
      where: { plannerId },
    });

    const totalMXN = items.reduce((sum: number, item: any) => sum + (item.priceMXN * item.quantity), 0);
    const totalAxo = items.reduce((sum: number, item: any) => sum + ((item.priceAxo || 0) * item.quantity), 0);

    await this.prisma.travelPlanner.update({
      where: { id: plannerId },
      data: {
        totalMXN,
        totalAxo,
        updatedAt: new Date(),
      },
    });
  }

  // 📊 Obtener estadísticas del planner
  async getPlannerStats(id: string, userId: string) {
    const planner = await this.getPlannerById(id, userId);
    
    const totalItems = planner.items?.length || 0;
    const totalMXN = planner.totalMXN;
    const totalAxo = planner.totalAxo;
    
    // Calcular días del viaje
    const daysDifference = planner.startDate && planner.endDate 
      ? Math.ceil((planner.endDate.getTime() - planner.startDate.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    // Categorizar items por fecha
    const itemsByDate = (planner.items || []).reduce((acc: Record<string, any[]>, item: any) => {
      if (item.selectedDate) {
        const dateKey = item.selectedDate.toISOString().split('T')[0];
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(item);
      }
      return acc;
    }, {} as Record<string, any[]>);

    return {
      totalItems,
      totalMXN,
      totalAxo,
      daysPlanned: daysDifference,
      itemsByDate: Object.keys(itemsByDate).map(date => ({
        date,
        items: itemsByDate[date],
        totalCost: itemsByDate[date].reduce((sum: number, item: any) => sum + (item.priceMXN * item.quantity), 0),
      })),
    };
  }
}
