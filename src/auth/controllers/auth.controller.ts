import { User } from 'src/users/entities/user.entity';
import { LoginUserDto } from './../dto/login-user.dto';
import { Controller, Post, Body, Get, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/get-user.decorator';
import { RawHeaders } from '../decorators/raw-headers.decorator';
import { UserRoleGuard } from '../guards/user-role.guard';
import { RoleProtected } from '../decorators/role-protected.decorator';
import { ValidRoles } from '../interfaces/validRoles';
import { Auth } from '../decorators/auth.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }


  
  @Get('/refresh-token')
  @Auth()
  refreshToken(@GetUser() user: User) {
    return this.authService.refreshToken(user);
  }

  /*@Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateEndpoint(
    //@Req() request: Request
    @GetUser() user: User,
    @GetUser('email') email: User,
    @RawHeaders() rawHeaders: string[],
  ){
    /*console.log({
      user: request.user,
    });
    console.log({user});
    return {
      ok: true,
      message: 'Hello world private endpoint',
      user,
      email,
      rawHeaders,
    }
  }

  @Get('private2')
  //@SetMetadata('roles',['Admin'])
  @RoleProtected(ValidRoles.admin)
  @UseGuards( AuthGuard(), UserRoleGuard)
  testingPrivateEndoint2(
    @GetUser() user: User,
  ){
    return {
      ok: true,
      user
    }
  }

  @Get('private3')
  @Auth(ValidRoles.employee, ValidRoles.admin)
  testingPrivateEndoint3(
    @GetUser() user: User,
  ){
    return {
      ok: true,
      user
    }
  }*/

}
