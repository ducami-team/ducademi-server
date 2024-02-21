import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../constatnts/userRole.enum";


export const Roles = (...roles : UserRole[])=>{
    return SetMetadata('roles', roles);
}