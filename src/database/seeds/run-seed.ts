import { NestFactory } from '@nestjs/core';
import { SeedService } from './seed/seed.service';
import { SeedsModule } from './seeds.module';

const runSeed = async () => {
  const app = await NestFactory.create(SeedsModule);
  await app.get(SeedService).run();
  await app.close();
};

void runSeed();
