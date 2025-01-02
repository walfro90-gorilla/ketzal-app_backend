import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class UsersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        name: string | null;
        id: number;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        role: import(".prisma/client").$Enums.Role;
    } | undefined>;
    findAll(): Prisma.PrismaPromise<{
        name: string | null;
        id: number;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    findOne(id: number): Promise<{
        name: string | null;
        id: number;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        name: string | null;
        id: number;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
    remove(id: number): Promise<{
        name: string | null;
        id: number;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
