import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    findOne(id: string): Promise<{
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
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
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
    remove(id: string): Promise<{
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
