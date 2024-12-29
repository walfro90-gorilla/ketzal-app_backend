import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class UsersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        role: string;
        profilePicture: string | null;
        bio: string | null;
    } | undefined>;
    findAll(): Prisma.PrismaPromise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        role: string;
        profilePicture: string | null;
        bio: string | null;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        role: string;
        profilePicture: string | null;
        bio: string | null;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        role: string;
        profilePicture: string | null;
        bio: string | null;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        role: string;
        profilePicture: string | null;
        bio: string | null;
    }>;
}
