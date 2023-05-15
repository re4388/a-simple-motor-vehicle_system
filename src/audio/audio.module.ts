import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { AudioController } from "./audioController";
import { AudioService } from "./audioService";

interface RateLimiter {
  /**
   * Max number of jobs processed
   */
  max: number;

  /**
   * per duration in milliseconds
   */
  duration: number;

  /**
   * When jobs get rate limited, they stay in the waiting queue
   * and are not moved to the delayed queue
   */
  bounceBack: boolean;
}

const rl: RateLimiter = {
  // max 1000 job in 10 secs
  max: 5000,
  duration: 10 * 1000,
  bounceBack: true,
};

@Module({
  // 要使用 queue 的 service 要先定義好要用那一個 queue 和設定 rateLimit
  imports: [
    BullModule.registerQueue({
      name: "audio",
      limiter: rl,
    }),
  ],
  controllers: [AudioController],
  providers: [AudioService],
})
export class AudioModule {}
