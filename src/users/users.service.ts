import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {

  // Inject PrismaService
  constructor(private prismaService: PrismaService) { }


  // Create method
  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prismaService.user.create({
        data: createUserDto
      })
    } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError) {
        if(error.code === 'P2002') {
          throw new ConflictException(`User with email ${createUserDto.email} already exists`)
        }
      }
      
    }
  }

  // Find all method
  findAll() {
    return this.prismaService.user.findMany()
  }

  // Find one method
  async findOne(id: number) {
    const userFound = await this.prismaService.user.findUnique({
      where: { id: id.toString() }
    })
    if (!userFound) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return userFound
  }

  // Update method  
  async update(id: number, updateUserDto: UpdateUserDto ) {
    const userFound = await this.prismaService.user.update({
      where: { id: id.toString() },
      data: updateUserDto
    })
    if (!userFound) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return userFound
  }

  // Remove method
  async remove(id: number) {
    const deletedUser = await this.prismaService.user.delete({
      where: {
        id: id.toString()
      }
    })
    if (!deletedUser) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return deletedUser
  }
}
