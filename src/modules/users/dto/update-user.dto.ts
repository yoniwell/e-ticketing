export interface UpdateUserDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    roleId?: bigint;
    branchId?: bigint;
    status?: "ACTIVE" | "INACTIVE";
}