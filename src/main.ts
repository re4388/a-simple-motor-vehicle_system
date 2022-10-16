import { ValidationPipe, VersioningType, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { useContainer } from "class-validator";
import { ConfigService } from '@nestjs/config';
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle(configService.get('app.name'))
    .setDescription("API docs")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);

  let logger = new Logger('main.ts')
  logger.log(`App is listening: ${configService.get('app.port')}`);
  await app.listen(configService.get('app.port'));
}
bootstrap();
