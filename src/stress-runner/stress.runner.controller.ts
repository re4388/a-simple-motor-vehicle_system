import { InjectQueue } from "@nestjs/bull";
import { Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { StressRunnerService } from "./stress.runner.service";
import { Response } from "express";

@ApiTags("stress-runner")
@Controller({
  path: "stress-runner",
  version: "1",
})
export class StressRunnerController {
  constructor(private readonly service: StressRunnerService) {}

  @Post("default") // REST POST 的路徑
  async run(@Res() res: Response) {
    await this.service.updateFile();
    return res.status(HttpStatus.OK).send({
      status: "200",
    });
  }
}
