import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

@Processor("audio") // consumer audio queue
export class AudioService {
  private readonly logger = new Logger(AudioService.name);

  @Process("transcode") // process transcode job
  async handleTranscode(job: Job) {
    this.logger.debug("Start transcoding...");
    let progress = 0;

    for (let i = 0; i < 4; i++) {
      await this._simulateTaskForSec(1);
      progress += 25;
      await job.progress(progress);
      this.logger.debug(`jobId:${job.id} - ${job.progress()}%`);
    }

    this.logger.debug("Transcoding completed");
  }

  async _simulateTaskForSec(sec) {
    const sleep = (time) =>
      new Promise((res) => setTimeout(res, time, "done sleeping"));
    await sleep(sec * 1000);
  }
}
