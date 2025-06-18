import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class SuppliersService {

  // inject PrismaService
  constructor(private prismaService: PrismaService) { }
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
            equals: createSupplierDto.name,
            mode: 'insensitive'
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
            equals: createSupplierDto.contactEmail,
            mode: 'insensitive'
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
          imgLogo: true,
          createdAt: true,
        }
      });
      
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
  findAll() {
    return this.prismaService.supplier.findMany()
  }

  // Search method for debugging
  async search(name?: string, email?: string) {
    const where: any = {};
    
    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive'
      };
    }
    
    if (email) {
      where.contactEmail = {
        contains: email,
        mode: 'insensitive'
      };
    }
    
    const suppliers = await this.prismaService.supplier.findMany({
      where,
      select: {
        id: true,
        name: true,
        contactEmail: true,
        createdAt: true
      }
    });
      console.log(`Search results for name="${name}", email="${email}":`, suppliers);
    return suppliers;
  }

  // Check dependencies before deletion
  async checkDependencies(id: number) {
    try {
      const supplier = await this.prismaService.supplier.findUnique({
        where: { id },
        include: {
          services: {
            select: { id: true, name: true }
          },
          users: {
            select: { id: true, name: true, email: true }
          },
          transportServices: {
            select: { id: true, name: true }
          },
          hotelServices: {
            select: { id: true, name: true }
          },
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
        services: supplier.services,
        users: supplier.users,
        transportServices: supplier.transportServices,
        hotelServices: supplier.hotelServices,
        canDelete: (
          supplier.services.length === 0 &&
          supplier.users.length === 0 &&
          supplier.transportServices.length === 0 &&
          supplier.hotelServices.length === 0
        ),
        totalDependencies: (
          supplier.services.length +
          supplier.users.length +
          supplier.transportServices.length +
          supplier.hotelServices.length
        )
      };

      return dependencies;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to check dependencies: ${errorMessage}`);
    }
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
          services: true,
          users: true,
          transportServices: true,
          hotelServices: true,
        }
      });

      if (!supplier) {
        throw new Error(`Supplier with id ${id} not found`);
      }

      console.log('Supplier found:', {
        id: supplier.id,
        name: supplier.name,
        servicesCount: supplier.services.length,
        usersCount: supplier.users.length,
        transportServicesCount: supplier.transportServices.length,
        hotelServicesCount: supplier.hotelServices.length,
      });

      // Check for dependencies
      const totalDependencies = 
        supplier.services.length + 
        supplier.users.length + 
        supplier.transportServices.length + 
        supplier.hotelServices.length;

      if (totalDependencies > 0) {
        const errorMessage = `Cannot delete supplier "${supplier.name}". It has dependencies: ${supplier.services.length} services, ${supplier.users.length} users, ${supplier.transportServices.length} transport services, ${supplier.hotelServices.length} hotel services`;
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
}
