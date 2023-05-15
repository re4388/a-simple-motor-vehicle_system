import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class CronJobService {
  private readonly logger = new Logger(CronJobService.name);

  // other kind of more expressive syntax
  // @Cron(CronExpression.EVERY_30_SECONDS)
  // @Cron("5 * * * * *", {
  //   name: "notifications",
  //   timeZone: "Asia/Taipei",
  // })
  @Cron(CronExpression.EVERY_2_HOURS)
  handleCron() {
    this.logger.debug("Called when the current second is 5");
  }
}
