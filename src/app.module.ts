import {Module} from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ServicesModule } from './services/services.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CategoriesModule } from './categories/categories.module';
import { GlobalLocationsModule } from './locations/global-locations.module';
import { WalletModule } from './wallet/wallet.module';
import { TestModule } from './test/test.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PlannersModule } from './planners/planners.module';

@Module({
    imports: [
        PrismaModule,
        ServicesModule, 
        SuppliersModule, 
        UsersModule, 
        ReviewsModule, 
        CategoriesModule, 
        GlobalLocationsModule, 
        WalletModule, 
        TestModule, 
        NotificationsModule,
        PlannersModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}