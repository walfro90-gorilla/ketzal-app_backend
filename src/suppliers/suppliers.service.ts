import { ConflictException, Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { SupplierApprovalDto, SupplierApprovalAction } from './dto/supplier-approval.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';
import { NotificationType } from '../notifications/dto/create-notification.dto';

@Injectable()

export class SuppliersService {
  constructor(
    private prismaService: PrismaService,
    private notificationsService: NotificationsService,
    private usersService: UsersService,
  ) {}

  async approveOrDeclineSupplier(supplierId: number, dto: SupplierApprovalDto) {
    // 1. Buscar supplier y user relacionado
    const supplier = await this.prismaService.supplier.findUnique({
      where: { id: supplierId },
      include: { Users: true },
    });
    console.log('DEBUG supplier:', JSON.stringify(supplier, null, 2));
    if (!supplier) throw new Error('Supplier not found');
    // Log quirúrgico para ver el valor y tipo de dto.userId
    console.log('DEBUG dto.userId:', dto.userId, 'type:', typeof dto.userId);
    // Log quirúrgico para ver los ids de los usuarios asociados
    console.log('DEBUG supplier.User ids:', supplier.Users.map((u: any) => u.id));
    // Asumimos que el primer usuario es el "dueño" (ajustar si hay lógica distinta)
    const user = supplier.Users.find((u: any) => String(u.id) === String(dto.userId));
    if (!user) {
      console.log('DEBUG comparación fallida: buscando', dto.userId, 'en', supplier.Users.map((u: any) => u.id));
      throw new Error('User not found for this supplier');
    }

    // 2. Actualizar estado en extras
    let newExtras: any = {};
    if (typeof supplier.extras === 'string') {
      try { newExtras = JSON.parse(supplier.extras); } catch { newExtras = {}; }
    } else if (typeof supplier.extras === 'object' && supplier.extras !== null) {
      newExtras = { ...supplier.extras };
    }
    if (dto.action === SupplierApprovalAction.APPROVE) {
      newExtras.isApproved = true;
      newExtras.isPending = false;
    } else {
      newExtras.isApproved = false;
      newExtras.isPending = false;
    }
    await this.prismaService.supplier.update({
      where: { id: supplierId },
      data: { extras: newExtras },
    });

    // 3. Crear notificación de resultado
    const notifType = NotificationType.SUPPLIER_APPROVAL;
    const notifTitle = dto.action === SupplierApprovalAction.APPROVE ? '¡Tu proveedor ha sido aprobado!' : 'Tu proveedor ha sido rechazado';
    const notifMsg = dto.action === SupplierApprovalAction.APPROVE
      ? '¡Felicidades! Tu proveedor fue aprobado por el equipo de KetzaL.'
      : 'Lamentablemente tu proveedor fue rechazado. Puedes revisar y volver a intentarlo.';
    await this.notificationsService.create({
      userId: user.id,
      title: notifTitle,
      message: notifMsg,
      type: notifType,
    });

    // 4. Si fue aprobado, cambiar rol y notificar
    if (dto.action === SupplierApprovalAction.APPROVE) {
      // Actualiza el rol directamente con Prisma
      await this.prismaService.users.update({ where: { id: user.id }, data: { role: 'admin' } });
      await this.notificationsService.create({
        userId: user.id,
        title: '¡Ahora eres administrador!',
        message: 'Tu cuenta ha sido actualizada a nivel administrador por la aprobación de tu proveedor.',
        type: NotificationType.SUCCESS,
      });
    }
    return { success: true };
  }

  // Estadísticas generales de suppliers
  async getSupplierStats() {
    // Total de suppliers
    const totalSuppliers = await this.prismaService.supplier.count();
    // Total de servicios
    const totalServices = await this.prismaService.service.count();
    // Total de usuarios asociados a suppliers
    const totalSupplierUsers = await this.prismaService.users.count({ where: { supplierId: { not: null } } });
    // Total de hotelServices y transportServices
    const totalHotelServices = await this.prismaService.service.count({ where: { serviceCategory: 'hotel' } });
    const totalTransportServices = await this.prismaService.service.count({ where: { serviceCategory: 'transport' } });

    return {
      totalSuppliers,
      totalServices,
      totalSupplierUsers,
      totalHotelServices,
      totalTransportServices,
    };
  }
  // Create method
  async create(createSupplierDto: CreateSupplierDto) {
    try {
      // Log the exact data being received
      console.log('=== SUPPLIER CREATION ATTEMPT ===');
      console.log('Received data:', JSON.stringify(createSupplierDto, null, 2));
      
      // Check if supplier with same name already exists
      const existingByName = await this.prismaService.supplier.findFirst({
        where: {
          name: {
            equals: createSupplierDto.name
          }
        }
      });
      
      if (existingByName) {
        console.log('Found existing supplier by name:', existingByName);
        throw new ConflictException(`Supplier with name "${createSupplierDto.name}" already exists`);
      }
      
      // Check if supplier with same email already exists
      const existingByEmail = await this.prismaService.supplier.findFirst({
        where: {
          contactEmail: {
            equals: createSupplierDto.contactEmail
          }
        }
      });
      
      if (existingByEmail) {
        console.log('Found existing supplier by email:', existingByEmail);
        throw new ConflictException(`Supplier with email "${createSupplierDto.contactEmail}" already exists`);
      }
        console.log('No existing suppliers found, proceeding with creation...');
        // Clean the data to ensure no undefined/null values cause issues
      // EXPLICITLY only include the fields we want to create
      const cleanData = {
        name: createSupplierDto.name.trim(),
        contactEmail: createSupplierDto.contactEmail.trim().toLowerCase(),
        ...(createSupplierDto.phoneNumber && { phoneNumber: createSupplierDto.phoneNumber.trim() }),
        ...(createSupplierDto.address && { address: createSupplierDto.address.trim() }),
        ...(createSupplierDto.description && { description: createSupplierDto.description.trim() }),
        ...(createSupplierDto.type && { supplierType: createSupplierDto.type.trim() }),
        ...(createSupplierDto.imgLogo && { imgLogo: createSupplierDto.imgLogo.trim() }),
      };
      
      console.log('Clean data for creation:', JSON.stringify(cleanData, null, 2));
        // IMPORTANT: Do not include id field - let Prisma auto-generate it
      const newSupplier = await this.prismaService.supplier.create({
        data: cleanData,
        select: {
          id: true,
          name: true,
          contactEmail: true,
          phoneNumber: true,
          address: true,
          description: true,
          supplierType: true,
          imgLogo: true,
          createdAt: true,
        }
      });

      // Usar userId del DTO si está disponible, si no buscar por email
      let userId = createSupplierDto.userId;
      if (!userId) {
        const userAdmin = await this.prismaService.users.findFirst({
          where: { email: createSupplierDto.contactEmail }
        });
        userId = userAdmin?.id;
      }
      if (userId) {
        await this.notificationsService.create({
          userId,
          title: '¡Tu proveedor está en revisión!',
          message: `Tu solicitud para el supplier "${newSupplier.name}" fue recibida y está en proceso de verificación. Te notificaremos dentro de 72 horas si fue aprobada o rechazada.`,
          type: NotificationType.INFO,
        });
      }

      console.log('Successfully created supplier:', newSupplier);
      return newSupplier;
      
    } catch (error) {
      console.log('=== ERROR IN SUPPLIER CREATION ===');
      if (typeof error === 'object' && error !== null && 'constructor' in error) {
        // @ts-ignore
        console.log('Error type:', (error as any).constructor.name);
      } else {
        console.log('Error type: unknown');
      }
      console.log('Error message:', (error as any)?.message);
      
      // If it's already a ConflictException, re-throw it
      if (error instanceof ConflictException) {
        throw error;
      }
      
      // Handle Prisma unique constraint errors
      if (error instanceof PrismaClientKnownRequestError) {
        const prismaError = error as PrismaClientKnownRequestError;
        console.log('Prisma error code:', prismaError.code);
        console.log('Prisma error meta:', prismaError.meta);
        
        if (prismaError.code === 'P2002') {
          const target = prismaError.meta?.target as string[];
          console.log('Unique constraint violation on fields:', target);
          
          if (target && target.includes('name')) {
            throw new ConflictException(`Supplier with name "${createSupplierDto.name}" already exists`);
          } else if (target && target.includes('contactEmail')) {
            throw new ConflictException(`Supplier with email "${createSupplierDto.contactEmail}" already exists`);
          } else {
            throw new ConflictException(`Supplier with this information already exists. Constraint violated on: ${target?.join(', ')}`);
          }
        }
      }
      
      // Log and re-throw any other errors
      console.error('Unexpected error creating supplier:', error);
      throw error;
    }
  }
  // Find all method
  async findAll(pending?: string) {
    const allSuppliers = await this.prismaService.supplier.findMany({ include: { users: true } });
    if (pending === 'true') {
      // Mostrar todos los suppliers con isPending === true, sin filtrar por emailVerified
      return allSuppliers
        .filter((s: any) => {
          let extras = s.extras;
          if (typeof extras === 'string') {
            try { extras = JSON.parse(extras); } catch { extras = {}; }
          }
          return (
            typeof extras === 'object' && extras !== null && 'isPending' in extras &&
            (extras as any).isPending === true
          );
        })
        .map((s: any) => ({
          ...s,
          supplierId: s.id,
          user: s.User && s.User.length > 0 ? s.User[0] : null
        }));
    }
    return allSuppliers;
  }

  // Find one method
  async findOne(id: number) {
    const supplierFound = await this.prismaService.supplier.findUnique({
      where: {
        id: id
      }
    })
    if (!supplierFound) {
      throw new Error(`Supplier with id ${id} not found`)
    }
    return supplierFound
  }

  // Update method
  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const productFound = await this.prismaService.supplier.update({
      where: {
        id: id
      },
      data: updateSupplierDto
    })
    if (!productFound) {
      throw new Error(`Supplier with id ${id} not found`)
    }
    return productFound
  }
  // Remove method with safety checks
  async remove(id: number) {
    try {
      console.log(`=== ATTEMPTING TO DELETE SUPPLIER ${id} ===`);
      
      // First, check if supplier exists
      const supplier = await this.prismaService.supplier.findUnique({
        where: { id },
        include: {
          offeredServices: true,
          users: true,
          transportProvider: true,
          hotelProvider: true,
        }
      });

      if (!supplier) {
        throw new Error(`Supplier with id ${id} not found`);
      }

      console.log('Supplier found:', {
        id: supplier.id,
        name: supplier.name,
        servicesCount: supplier.offeredServices.length,
        usersCount: supplier.users.length,
        transportServicesCount: supplier.transportProvider.length,
        hotelServicesCount: supplier.hotelProvider.length,
      });

      // Check for dependencies
      const totalDependencies = 
        supplier.offeredServices.length + 
        supplier.users.length + 
        supplier.transportProvider.length + 
        supplier.hotelProvider.length;

      if (totalDependencies > 0) {
        const errorMessage = `Cannot delete supplier "${supplier.name}". It has dependencies: ${supplier.offeredServices.length} services, ${supplier.users.length} users, ${supplier.transportProvider.length} transport services, ${supplier.hotelProvider.length} hotel services`;
        console.error(errorMessage);
        throw new ConflictException(errorMessage);
      }

      // If no dependencies, proceed with deletion
      const deletedSupplier = await this.prismaService.supplier.delete({
        where: { id }
      });

      console.log('✅ Supplier deleted successfully:', deletedSupplier.name);
      return {
        success: true,
        message: `Supplier "${deletedSupplier.name}" deleted successfully`,
        deletedSupplier
      };

    } catch (error) {
      console.error('Error deleting supplier:', error);
      
      if (error instanceof ConflictException) {
        throw error;
      }
      
      // Safely extract error message if possible
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to delete supplier with id ${id}: ${errorMessage}`);
    }
  }

  // Alternative: Soft delete method (mark as inactive instead of deleting)
  async softDelete(id: number) {
    try {
      const supplier = await this.prismaService.supplier.findUnique({
        where: { id }
      });

      if (!supplier) {
        throw new Error(`Supplier with id ${id} not found`);
      }

      // Add a status field to mark as inactive (you'd need to add this field to schema)
      // const updatedSupplier = await this.prismaService.supplier.update({
      //   where: { id },
      //   data: { status: 'INACTIVE' }
      // });

      return {
        success: true,
        message: `Supplier "${supplier.name}" marked as inactive`,
        supplier
      };

    } catch (error) {
      // Safely extract error message if possible
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to soft delete supplier: ${errorMessage}`);
    }
  }

  // Check for duplicate suppliers by name or email
  async checkDuplicate(name?: string, email?: string, excludeId?: number) {
    const result = {
      nameExists: false,
      emailExists: false,
      existingSuppliers: [] as any[]
    };

    if (name) {
      const nameExists = await this.prismaService.supplier.findFirst({
        where: {
          name: {
            equals: name
          },
          ...(excludeId && { id: { not: excludeId } })
        },
        select: { id: true, name: true, contactEmail: true }
      });
      if (nameExists) {
        result.nameExists = true;
        result.existingSuppliers.push(nameExists);
      }
    }

    if (email) {
      const emailExists = await this.prismaService.supplier.findFirst({
        where: {
          contactEmail: {
            equals: email
          },
          ...(excludeId && { id: { not: excludeId } })
        },
        select: { id: true, name: true, contactEmail: true }
      });
      if (emailExists) {
        result.emailExists = true;
        result.existingSuppliers.push(emailExists);
      }
    }
    return result;
  }

  // Search suppliers by name or email
  async search(name?: string, email?: string) {
    const where: any = {};
    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }
    if (email) {
      where.contactEmail = { contains: email, mode: 'insensitive' };
    }
    return this.prismaService.supplier.findMany({
      where,
      select: {
        id: true,
        name: true,
        contactEmail: true,
        createdAt: true
      }
    });
  }

  // Check supplier dependencies before delete
  async checkDependencies(id: number) {
    const supplier = await this.prismaService.supplier.findUnique({
      where: { id },
      include: {
        offeredServices: true,
        users: true,
        transportProvider: true,
        hotelProvider: true,
      }
    });
    if (!supplier) {
      throw new Error(`Supplier with id ${id} not found`);
    }
    const dependencies = {
      supplier: {
        id: supplier.id,
        name: supplier.name
      },
      services: supplier.offeredServices,
      users: supplier.users,
      transportServices: supplier.transportProvider,
      hotelServices: supplier.hotelProvider,
      canDelete: (
        supplier.offeredServices.length === 0 &&
        supplier.users.length === 0 &&
        supplier.transportProvider.length === 0 &&
        supplier.hotelProvider.length === 0
      ),
      totalDependencies: (
        supplier.offeredServices.length +
        supplier.users.length +
        supplier.transportProvider.length +
        supplier.hotelProvider.length
      )
    };
    return dependencies;
  }
}
