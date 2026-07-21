export interface JwtPayload {

    sub: string;

    roleId: string;

    branchId: string;

}
export interface AuthTokens {

    accessToken: string;

    refreshToken: string;

}