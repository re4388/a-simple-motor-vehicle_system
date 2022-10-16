import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, LoggerService } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

// to mock out log
class TestLogger implements LoggerService {
  log(message: string) { }
  error(message: string, trace: string) { }
  warn(message: string) { }
  debug(message: string) { }
  verbose(message: string) { }
}

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(new TestLogger())
    await app.init();
  });

  afterAll(async () => {
    await Promise.all([
      app.close(),
    ])
  })

  it("/ (GET)", () => {
    return request(app.getHttpServer())
      .get("/healthCheck")
      .expect(200)
      .expect("Green light!");
  });
});
