import { Injectable, Logger } from "@nestjs/common";
import * as moment from "moment";
import * as shell from "shelljs";

@Injectable()
export class StressRunnerService {
  private readonly logger = new Logger(StressRunnerService.name);
  constructor() {}

  async run() {
    return {
      createdAt: moment().format(),
    };
  }

  public async updateFile() {
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
}
