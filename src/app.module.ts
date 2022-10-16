import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmConfigService } from "./database/typeorm-config.service";
import { MotorVehicleModule } from "./motor-vehicles/motor-vehicle.module";
import { ExaminationModule } from "./examinations/examination.module";
import { MotorVehicleOwnerModule } from "./motor-vehicle-owners/motor-vehicle-owner.module";
import databaseConfig from "./config/database.config";
import appConfig from './config/app.config';
import { LoggerMiddleware } from "./middleware/logger.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        appConfig,
      ],
      envFilePath: [".env"],
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}