import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UsersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        name: string | null;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        image: string | null;
        role: import(".prisma/client").$Enums.Role;
        supplierId: number | null;
        createdAt: Date;
        updatedAt: Date;
    } | undefined>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string | null;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        image: string | null;
        role: import(".prisma/client").$Enums.Role;
        supplierId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: string;
        name: string | null;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        image: string | null;
        role: import(".prisma/client").$Enums.Role;
        supplierId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        name: string | null;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        image: string | null;
        role: import(".prisma/client").$Enums.Role;
        supplierId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: string;
        name: string | null;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        image: string | null;
        role: import(".prisma/client").$Enums.Role;
        supplierId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
