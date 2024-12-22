import { PartialType } from '@nestjs/swagger';
import { CreateSupplierDto } from './create-supplier.dto';

export type UpdateSupplierDto = Partial<CreateSupplierDto>;