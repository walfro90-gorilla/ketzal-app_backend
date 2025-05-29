import { Prisma } from '@prisma/client';
import { ServiceDateRange } from '../dto/create-service.dto';

export class Service {
  dates?: ServiceDateRange[];
}
