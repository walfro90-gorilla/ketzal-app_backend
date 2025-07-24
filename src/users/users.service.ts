import { ConflictException, Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../notifications/dto/create-notification.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {

  // Inject PrismaService
  constructor(
    private prismaService: PrismaService,
    @Inject(forwardRef(() => NotificationsService))
    private notificationsService: NotificationsService,
  ) {}


  // Create method
  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prismaService.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: createUserDto.password,
          // Add other fields as needed
        }
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        const prismaError = error as PrismaClientKnownRequestError;
        if (prismaError.code === 'P2002') {
          throw new ConflictException(`User with email ${createUserDto.email} already exists`)
        }
      }
      
    }
  }  // Find all method
  findAll() {
    return this.prismaService.user.findMany({
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            contactEmail: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }  // Find one method
  async findOne(id: string) {
    const userFound = await this.prismaService.user.findUnique({
      where: { id: id },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            contactEmail: true
          }
        }
      }
    })
    if (!userFound) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return userFound
  }
  // Update method  
  async update(id: string, updateUserDto: UpdateUserDto ) {
    // Obtener el usuario antes de actualizar para comparar el estado de emailVerified
    const prevUser = await this.prismaService.user.findUnique({ where: { id } });
    const userFound = await this.prismaService.user.update({
      where: { id: id },
      data: updateUserDto
    });
    if (!userFound) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    // Si el emailVerified estaba vacío y ahora tiene valor, notificar al usuario y a los superadmins
    if (
      prevUser &&
      (!prevUser.emailVerified || prevUser.emailVerified === null) &&
      userFound.emailVerified
    ) {
      // Buscar si el usuario tiene supplier asociado pendiente
      const supplier = await this.prismaService.supplier.findFirst({
        where: {
          users: { some: { id } },
          // Solo si está pendiente
          OR: [
            { extras: { equals: { isPending: true } } },
            // Si extras es string, intentar parsear en backend
          ]
        }
      });
      if (supplier) {
        // Notificación para el usuario: solicitud enviada
        await this.notificationsService.create({
          userId: id,
          title: '¡Solicitud enviada!',
          message: `Tu solicitud para el supplier "${supplier.name}" ha sido enviada y está pendiente de aprobación por el equipo de KetzaL.`,
          type: NotificationType.INFO,
        });
        // Notificación para el usuario: en revisión
        await this.notificationsService.create({
          userId: id,
          title: 'Tu proveedor está en revisión',
          message: `Tu solicitud para el supplier "${supplier.name}" está en revisión. Te notificaremos dentro de 72 horas si fue aprobada o rechazada.`,
          type: NotificationType.INFO,
        });
        // Notificación para todos los superadmins
        const superadmins = await this.prismaService.user.findMany({ where: { role: 'superadmin' } });
        for (const superadmin of superadmins) {
          await this.notificationsService.create({
            userId: superadmin.id,
            title: 'Nueva Solicitud de Proveedor Turístico',
            message: `${userFound.name || userFound.email} ha solicitado convertirse en proveedor de servicios turísticos (${supplier.name}). Revisa y aprueba/rechaza la solicitud en el panel de administración.`,
            type: NotificationType.SUPPLIER_APPROVAL,
          });
        }
      }
    }
    return userFound;
  }
  // Remove method
  async remove(id: string) {
    const deletedUser = await this.prismaService.user.delete({
      where: {
        id: id
      }
    })
    if (!deletedUser) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return deletedUser
  }

  // Search users by name or email
  async searchUsers(name?: string, email?: string) {
    const where: any = {};
    
    if (name || email) {
      where.OR = [];
      if (name) {
        where.OR.push({
          name: {
            contains: name,
            mode: 'insensitive'
          }
        });
      }
      if (email) {
        where.OR.push({
          email: {
            contains: email,
            mode: 'insensitive'
          }
        });
      }
    }

    return this.prismaService.user.findMany({
      where,
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            contactEmail: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
}
