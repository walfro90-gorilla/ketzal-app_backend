import {Module} from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { ServicesModule } from './services/services.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
    imports: [ProductsModule, ServicesModule, SuppliersModule, UsersModule, ReviewsModule, CategoriesModule],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {}