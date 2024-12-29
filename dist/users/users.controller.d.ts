import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
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
    remove(id: string): Promise<{
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
