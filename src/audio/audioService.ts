import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import * as shell from "shelljs";
import * as moment from "moment";

@Processor("audio") // consumer audio queue
export class AudioService {
  private readonly logger = new Logger(AudioService.name);

  @Process("transcode") // process transcode job
  async handler(job: Job) {
    this.logger.debug("Start transcoding...");
    let progress = 0;

    // 這邊就是模擬處理的地方
    // for (let i = 0; i < 4; i++) {
    //   await this.simulateTaskForSec(1);
    //   progress += 25;
    //   await job.progress(progress);
    //   this.logger.debug(`jobId:${job.id} - ${job.progress()}%`);
    // }

    await this.updateFile(job.data);

    this.logger.debug("Transcoding completed");
  }

  private async updateFile(data: string) {
    this.logger.debug(`start updateFile...`);
    shell.cd("./src/audio");

    // let { stdout: before } = shell.cat("./a1.txt");
    // console.log("-> resBefore", before);

    const now = moment().toDate();
    const nowLog = now.toLocaleString() + " ms:" + now.getMilliseconds();
    this.logger.debug(`nowLog: ${nowLog}`);
    shell.echo(`${nowLog}`).toEnd("./a1.txt");

    // let { stdout: after } = shell.cat("./a1.txt");
    // console.log("-> resAfter", after);

    this.logger.debug(`finish updateFile...`);
  }

  private async simulateTaskForSec(sec) {
    const sleep = (time) =>
      new Promise((res) => setTimeout(res, time, "done sleeping"));
    await sleep(sec * 1000);
  }
}
