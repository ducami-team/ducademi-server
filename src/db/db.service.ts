import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class MysqlConnectService implements TypeOrmOptionsFactory {
    constructor(private readonly configService : ConfigService){}
    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        Logger.log(this.configService.get<string>('DATABASE_HOST'));
        return { 
            type : 'mysql',
            host : this.configService.get<string>('DATABASE_HOST'),
            port : this.configService.get<number>('DATABASE_PORT'),
            username : this.configService.get<string>('DATABASE_USERNAME'),
            password : this.configService.get<string>('DATABASE_PASSWORD'),
            database : this.configService.get<string>('DATABASE_DATABASE'),
            entities : [__dirname + '/../**/*.entity{/.ts,.js}'],
            // timezone : 'Asia/Seoul',
            synchronize : true,
            autoLoadEntities : true,
            logging : false,
        }
    }
    
}
