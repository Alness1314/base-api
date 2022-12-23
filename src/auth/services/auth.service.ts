import { LoginUserDto } from './../dto/login-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>,
        private readonly _jwtService: JwtService,
    ){}

    async login(loginUserDto: LoginUserDto){
        const {password, email} = loginUserDto;
        const user = await this._userRepository.findOne({
            where: { email},
            select: {email: true, password: true, id: true}
        })
        if(!user){
            throw new UnauthorizedException('Please check your credentials, password or incorrect email');
        }

        if(!bcrypt.compareSync(password, user.password))
            throw new UnauthorizedException('Please check your credentials, password or incorrect email');

        //TODO: return jwt token
        return {
            ...user,
            token: this.generateJwtToken({id: user.id, email: user.email})
        };

        
    }


    async refreshToken(user: User){
        //TODO: return jwt token
        return {
            ...user,
            token: this.generateJwtToken({id: user.id, email: user.email})
        };
    }

    private generateJwtToken(payload: JwtPayload){
        const token = this._jwtService.sign( payload );
        return token;
    }
}
