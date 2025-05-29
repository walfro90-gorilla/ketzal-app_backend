import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UsersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        supplierId: number | null;
        name: string | null;
        createdAt: Date;
        image: string | null;
        updatedAt: Date;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        role: import(".prisma/client").$Enums.Role;
    } | undefined>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        supplierId: number | null;
        name: string | null;
        createdAt: Date;
        image: string | null;
        updatedAt: Date;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    findOne(id: number): Promise<{
        id: string;
        supplierId: number | null;
        name: string | null;
        createdAt: Date;
        image: string | null;
        updatedAt: Date;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        supplierId: number | null;
        name: string | null;
        createdAt: Date;
        image: string | null;
        updatedAt: Date;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
    remove(id: number): Promise<{
        id: string;
        supplierId: number | null;
        name: string | null;
        createdAt: Date;
        image: string | null;
        updatedAt: Date;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
