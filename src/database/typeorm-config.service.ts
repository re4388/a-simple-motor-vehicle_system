import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Examination } from '../examinations/entities/examination.entity';
import { MotorVehicleOwner } from '../motor-vehicle-owners/entities/motor-vehicle-owner.entity';
import { MotorVehicle } from '../motor-vehicles/entities/motor-vehicle.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {

        let typeOrmModuleOptions = {
            type: this.configService.get('database.type'),
            url: this.configService.get('database.url'),
            host: this.configService.get('database.host'),
            port: this.configService.get('database.port'),
            username: this.configService.get('database.username'),
            password: this.configService.get('database.password'),
            database: this.configService.get('database.name'),
            synchronize: this.configService.get('database.synchronize'),
            dropSchema: false,
            keepConnectionAlive: true,
            logging: this.configService.get('app.nodeEnv') !== 'production',
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}'
            ],
            migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
            cli: {
                entitiesDir: 'src',
                migrationsDir: 'src/database/migrations',
                subscribersDir: 'subscriber',
            },
            extra: {
                // based on https://node-postgres.com/api/pool
                // max connection pool size
                max: this.configService.get('database.maxConnections'),


                // heroku setting
                // "ssl": {
                //     "require": true,
                //     "rejectUnauthorized": false
                // },

                // local setting
                ssl: undefined

                // ssl: this.configService.get('database.sslEnabled')
                //     ? {
                //         require: this.configService.get(
                //             'database.sslRequired',
                //         ),
                //         rejectUnauthorized: this.configService.get(
                //             'database.rejectUnauthorized',
                //         ),
                //         ca: this.configService.get('database.ca') ?? undefined,
                //         key: this.configService.get('database.key') ?? undefined,
                //         cert: this.configService.get('database.cert') ?? undefined,
                //     }
                //     : undefined,
            },
        } as TypeOrmModuleOptions;
        console.log(typeOrmModuleOptions)
        return typeOrmModuleOptions
    }
}
