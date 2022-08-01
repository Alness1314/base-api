import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigKeys } from './../../utils/keys/config.keys';
import { UsersService } from './../../users/services/users.service';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/payload.interface";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly _userService: UsersService,
        private readonly _configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: _configService.get(ConfigKeys.JWT_SECRET),
        })
    }

    async validate(payload: JwtPayload) {
        const { id } = payload;
        const user = await this._userService.findOne(id);

        if(!user){
            throw new UnauthorizedException('Token not valid');
        }
        if(!user.status){
            throw new UnauthorizedException('User is not active, talk with an admin');
        }
        return user;
    }
}