import { ConfigKeys } from './../utils/keys/config.keys';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            imports:[ConfigModule],
            inject: [ConfigService],
            useFactory: (_configService: ConfigService) => {
                return {
                    type: 'mysql',
                    host: _configService.get(ConfigKeys.HOST),
                    port: _configService.get(ConfigKeys.PORT),
                    username: _configService.get(ConfigKeys.USERNAME),
                    password: _configService.get(ConfigKeys.PASSWORD),
                    database:_configService.get(ConfigKeys.DATABASE),
                    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                    autoLoadEntities: true,
                    synchronize: true,
                };
            }
        }),
    ],
    exports:[TypeOrmModule],
})
export class DatabaseModule {}
