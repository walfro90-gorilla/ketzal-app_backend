import {Module} from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { ServicesModule } from './services/services.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CategoriesModule } from './categories/categories.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [ProductsModule, ServicesModule, SuppliersModule, UsersModule, ReviewsModule, CategoriesModule],
    controllers: [AppController],
    providers: [PrismaService, AppService],
})
export class AppModule {}