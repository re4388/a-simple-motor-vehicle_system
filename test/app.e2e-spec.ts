import { HttpStatus } from "@nestjs/common";
import * as request from "supertest";
import { APP_URL } from "./utils/constants";

// to mock out log
// class TestLogger implements LoggerService {
//   log(message: string) {}
//   error(message: string, trace: string) {}
//   warn(message: string) {}
//   debug(message: string) {}
//   verbose(message: string) {}
// }

describe("AppController (e2e)", () => {
  const app = APP_URL;
  // let app: INestApplication;

  // beforeEach(async () => {
  // const moduleFixture: TestingModule = await Test.createTestingModule({
  //   imports: [AppModule],
  // }).compile();
  // app = moduleFixture.createNestApplication();
  // app.useLogger(new TestLogger())
  // await app.init();
  // });

  // afterAll(async () => {
  //   await Promise.all([
  //     app.close(),
  //   ])
  // })

  it("GET /api/healthCheck", async function () {
    const response = await request(app).get("/api/healthCheck");
    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.text).toEqual("Green light!");
  });

  // it("/api/healthCheck (GET)", async () => {
  //   return await request(app)
  //     .get("/healthCheck")
  //     .expect(200)
  //     .expect("Green light!");
  // });

  // it("/api/motor-vehicle-owner (POST)", async () => {
  //   return await request(app)
  //     .post("/api/v1/motor-vehicle-owner")
  //     .send(
  //       {
  //         name: "e2eUser",
  //         email: "e2eUser@example.com",
  //         address: "Don Man Road No.21",
  //         city: "Taichung City"
  //       })
  //     .expect(200);
  // });
});
