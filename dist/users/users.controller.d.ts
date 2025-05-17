import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        name: string | null;
        id: string;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        supplierId: number | null;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        role: import(".prisma/client").$Enums.Role;
    } | undefined>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string | null;
        id: string;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        supplierId: number | null;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    findOne(id: string): Promise<{
        name: string | null;
        id: string;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        supplierId: number | null;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        name: string | null;
        id: string;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        supplierId: number | null;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
    remove(id: string): Promise<{
        name: string | null;
        id: string;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        supplierId: number | null;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
