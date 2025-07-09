import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {

  // Inject PrismaService
  constructor(private prismaService: PrismaService) { }


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
    const userFound = await this.prismaService.user.update({
      where: { id: id },
      data: updateUserDto
    })
    if (!userFound) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return userFound
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
