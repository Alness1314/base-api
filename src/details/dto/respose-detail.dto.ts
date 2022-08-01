import { ApiProperty } from "@nestjs/swagger";

export class ResponseDetailDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    lastname: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    ine: string;

    @ApiProperty()
    imagenId: string;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    createAt: Date;
}