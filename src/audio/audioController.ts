import { InjectQueue } from "@nestjs/bull";
import { Controller, Post } from "@nestjs/common";
import { Queue } from "bull";
import { ApiTags } from "@nestjs/swagger";

interface BackoffOptions {
  /**
   * Backoff type, which can be either `fixed` or `exponential`
   */
  type: string;

  /**
   * Backoff delay, in milliseconds
   */
  delay?: number | undefined;

  /**
   * Options for custom strategies
   */
  strategyOptions?: any;
}

const backOffOpt = {
  type: "exponential",
  delay: 200,
};

@ApiTags("audio")
@Controller({
  path: "audio",
  version: "1",
})
export class AudioController {
  constructor(@InjectQueue("audio") private readonly audioQueue: Queue) {}

  @Post("transcode") // produce `transcode` job
  async transcode() {
    const res = await this.audioQueue.add(
      "transcode",
      {
        file: "audio.mp3",
      },
      {
        priority: 1,
        delay: 0,
        attempts: 1,
        backoff: backOffOpt,
        lifo: false,
        timeout: 1000,
        removeOnComplete: false,
        removeOnFail: false,
        stackTraceLimit: 2000,
      }
    );

    return res;
  }
}
