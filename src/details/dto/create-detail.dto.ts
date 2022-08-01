import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID, Matches, MinLength } from "class-validator";

export class CreateDetailDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    lastname: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    address: string;

    @ApiProperty()
    @Matches(/^[+]*[(]{0,1}[0-9]{1,4}[)][0-9]{1,3}-[0-9]{1,3}-[0-9]{4}/,{
        message: "the format of phone number is not supported"
    })
    @IsString()
    @IsOptional()
    phone: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @Matches(/[A-Z]{6}[0-9]{8}[A-Z]{1}[0-9]{3}/,{
        message: "please verify the elector key"
    })
    ine: string;

    @ApiProperty()
    @IsUUID()
    @IsOptional()
    imagenId: string;

    @ApiProperty()
    @IsNotEmpty()
    active: boolean;
}
