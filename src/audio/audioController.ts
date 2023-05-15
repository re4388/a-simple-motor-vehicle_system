import { InjectQueue } from "@nestjs/bull";
import { Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Queue } from "bull";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";

// interface BackoffOptions {
//   /**
//    * Backoff type, which can be either `fixed` or `exponential`
//    */
//   type: string;
//
//   /**
//    * Backoff delay, in milliseconds
//    */
//   delay?: number | undefined;
//
//   /**
//    * Options for custom strategies
//    */
//   strategyOptions?: any;
// }

@ApiTags("audio")
@Controller({
  path: "audio",
  version: "1",
})
export class AudioController {
  constructor(@InjectQueue("audio") private readonly audioQueue: Queue) {}

  @Post("transcode") // REST POST 的路徑
  async transcode(@Res() res: Response) {
    // 這邊就是建立 job 的邏輯
    // 有需要開一個接口出來讓大家用？
    // 大家大家可能會想要有不同的 priority?
    // 應該設計成有一組 default的 pri
    // 但是你也可以自己修改 pri
    await this.audioQueue.add(
      "transcode",
      {
        file: "audio.mp3",
      },
      {
        priority: 1,
        delay: 0,
        attempts: 1,
        backoff: {
          type: "exponential",
          delay: 200,
        },
        lifo: false,
        timeout: 2000,
        removeOnComplete: false,
        removeOnFail: false,
        stackTraceLimit: 2000,
      }
    );

    return res.status(HttpStatus.OK).send({
      status: "200",
    });
  }
}
