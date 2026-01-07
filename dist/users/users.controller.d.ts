import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        createdAt: Date;
        name: string | null;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        image: string | null;
        role: import(".prisma/client").$Enums.Role;
        supplierId: number | null;
        updatedAt: Date;
        axoCoinsEarned: number | null;
        referralCode: string | null;
    }>;
    searchUsers(name?: string, email?: string): Promise<({
        supplier: {
            id: number;
            name: string;
            contactEmail: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        name: string | null;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        image: string | null;
        role: import(".prisma/client").$Enums.Role;
        supplierId: number | null;
        updatedAt: Date;
        axoCoinsEarned: number | null;
        referralCode: string | null;
    })[]>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        supplier: {
            id: number;
            name: string;
            contactEmail: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        name: string | null;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        image: string | null;
        role: import(".prisma/client").$Enums.Role;
        supplierId: number | null;
        updatedAt: Date;
        axoCoinsEarned: number | null;
        referralCode: string | null;
    })[]>;
    findOne(id: string): Promise<{
        supplier: {
            id: number;
            name: string;
            contactEmail: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        name: string | null;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        image: string | null;
        role: import(".prisma/client").$Enums.Role;
        supplierId: number | null;
        updatedAt: Date;
        axoCoinsEarned: number | null;
        referralCode: string | null;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        createdAt: Date;
        name: string | null;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        image: string | null;
        role: import(".prisma/client").$Enums.Role;
        supplierId: number | null;
        updatedAt: Date;
        axoCoinsEarned: number | null;
        referralCode: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string | null;
        email: string;
        password: string | null;
        emailVerified: Date | null;
        image: string | null;
        role: import(".prisma/client").$Enums.Role;
        supplierId: number | null;
        updatedAt: Date;
        axoCoinsEarned: number | null;
        referralCode: string | null;
    }>;
}
