import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { MotorVehicleModule } from './motor-vehicle/motor-vehicle.module';
import { ExaminationModule } from './examination/examination.module';
import { MotorVehicleOwnerModule } from './motor-vehicle-owner/motor-vehicle-owner.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
      ],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    ConfigModule.forRoot(),
    MotorVehicleModule,
    ExaminationModule,
    MotorVehicleOwnerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
