import {
  Processor,
  Process,
  OnQueueActive,
  OnGlobalQueueCompleted,
  InjectQueue,
} from "@nestjs/bull";
import { Job, Queue } from "bull";

@Processor("audio") // listen to audio queue
export class AudioConsumer {
  constructor(@InjectQueue("audio") private readonly audioQueue: Queue) {}
  @OnQueueActive() // fire when job has started.
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`
    );
  }

  /**
   * When a queue is shared across multiple processes, we encounter the possibility
   * of global events.
   * For a listener in one process to receive an event notification triggered
   * by another process, it must register for a global event.
   */
  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number, result: any) {
    const job = await this.audioQueue.getJob(jobId);
    console.log("(Global) on completed: job ", job.id, " -> result: ", result);
  }
}
