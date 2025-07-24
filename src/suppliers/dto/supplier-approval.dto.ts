import { IsEnum, IsString } from 'class-validator';

export enum SupplierApprovalAction {
  APPROVE = 'approve',
  DECLINE = 'decline',
}

export class SupplierApprovalDto {
  @IsEnum(SupplierApprovalAction)
  action: SupplierApprovalAction = SupplierApprovalAction.APPROVE;

  @IsString()
  userId: string = '';
}
