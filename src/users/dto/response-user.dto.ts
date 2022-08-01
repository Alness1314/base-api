import { ApiProperty } from '@nestjs/swagger';
import { ResponseDetailDto } from './../../details/dto/respose-detail.dto';
import { ResponseRolDto } from './../../roles/dto/response-role.dto';
export class ResponseUserDto {
    @ApiProperty({
        example: '460124df-f3ea-4325-b1df-3a68a4642ea6',
    })
    id: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    detail: ResponseDetailDto;

    @ApiProperty()
    roles: ResponseRolDto[];

    @ApiProperty()
    status: string;

    @ApiProperty()
    createdAt: Date;
}