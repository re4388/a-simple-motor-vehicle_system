import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MotorVehicle } from "../motor-vehicles/entities/motor-vehicle.entity";
import { PostEntity } from "./entities/post.entity";

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
