import { ResponseDetailDto } from './../../details/dto/respose-detail.dto';
import { ResponseRolDto } from './../../roles/dto/response-role.dto';
export class ResponseUserDto {
    id: string;
    email: string;
    password: string;
    detail: ResponseDetailDto;
    roles: ResponseRolDto[];
    status: string;
    createdAt: Date;
}