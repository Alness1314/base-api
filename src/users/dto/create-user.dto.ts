import { CreateDetailDto } from './../../details/dto/create-detail.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(32)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    /*@ApiProperty()
    @IsString()
    @IsOptional()
    detail: string;*/
    @ApiProperty()
    @IsOptional()
    detail: CreateDetailDto;

    @ApiProperty()
    @IsOptional()
    rolesId: string[];
}
