import { Module } from "@nestjs/common";
import { StressRunnerService } from "./stress.runner.service";
import { StressRunnerController } from "./stress.runner.controller";

@Module({
  controllers: [StressRunnerController],
  providers: [StressRunnerService],
})
export class StressRunnerModule {}
