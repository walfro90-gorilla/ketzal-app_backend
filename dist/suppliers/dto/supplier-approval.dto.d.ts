export declare enum SupplierApprovalAction {
    APPROVE = "approve",
    DECLINE = "decline"
}
export declare class SupplierApprovalDto {
    action: SupplierApprovalAction;
    userId: string;
}
