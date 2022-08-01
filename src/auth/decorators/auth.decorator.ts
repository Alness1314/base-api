import { UserRoleGuard } from './../guards/user-role.guard';
import { RoleProtected } from './role-protected.decorator';
import { ValidRoles } from './../interfaces/validRoles';
import { AuthGuard } from '@nestjs/passport';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';



export function Auth(...roles: ValidRoles[]) {

    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard),
        ApiBearerAuth()
    );

}