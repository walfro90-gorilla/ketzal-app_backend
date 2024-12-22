import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class UsersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        profilePicture: string | null;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | undefined>;
    findAll(): Prisma.PrismaPromise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        profilePicture: string | null;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        profilePicture: string | null;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        profilePicture: string | null;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        profilePicture: string | null;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
