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
import appConfig from "./config/app.config";
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { PostModule } from "./post/post.module";
import { ScheduleModule } from "@nestjs/schedule";
import { CronJobService } from "./cron-job/cron-job.service";
import { BullModule } from "@nestjs/bull";
import { AudioModule } from "./audio/audio.module";
import { StressRunnerModule } from "./stress-runner/stress-runner.module";

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: 7378,
      },
      prefix: "queue",
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: [".env"],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      },
    }),
    ConfigModule.forRoot(),
    MotorVehicleModule,
    ExaminationModule,
    MotorVehicleOwnerModule,
    PostModule,
    AudioModule,
    StressRunnerModule,
  ],
  controllers: [AppController],
  providers: [AppService, CronJobService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
