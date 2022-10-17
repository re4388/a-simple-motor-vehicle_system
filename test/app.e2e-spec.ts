import { HttpStatus } from "@nestjs/common";
import * as request from "supertest";
import { APP_URL } from "./utils/constants";

describe("AppController (e2e)", () => {
  const app = APP_URL;
  let newOwnerId: string;
  let newMotorId: string;
  let newExamId: string;

  // console.log("app", app);

  afterAll(async () => {
    request(app)
      .delete(`/api/v1/motor-vehicle/${newMotorId}`)
      .then(async () => {
        request(app)
          .delete(`/api/v1/motor-vehicle-owner/${newOwnerId}`)
          .then(async () => {
            request(app).delete(`/api/v1/examination/${newExamId}`);
          });
      });
  });

  it("/api/healthCheck (GET)", async function () {
    const response = await request(app).get("/api/healthCheck");
    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.text).toEqual("Green light!");
  });

  it("/api/motor-vehicle-owner (POST/PATCH/GET)", async () => {
    const fakeOwner = {
      name: "e2eUser",
      email: "e2eUser@example.com",
      address: "Don Man Road No.21",
      city: "Taichung City",
    };

    // test POST
    const response = await request(app)
      .post("/api/v1/motor-vehicle-owner")
      .send(fakeOwner);

    expect(response.status).toEqual(HttpStatus.OK);
    newOwnerId = response.body.id;
    // console.log("newOwnerId", newOwnerId);

    // test PATCH
    const newAddress = "Don Man Road No.99";
    const patchResponse = await request(app)
      .patch(`/api/v1/motor-vehicle-owner/${newOwnerId}`)
      .send({ address: newAddress });

    expect(patchResponse.status).toEqual(HttpStatus.OK);

    fakeOwner.address = newAddress;

    // test GET
    const getResponse = await request(app).get(
      `/api/v1/motor-vehicle-owner/${newOwnerId}`
    );
    expect(getResponse.status).toEqual(HttpStatus.OK);
    expect(getResponse.body).toEqual({
      id: newOwnerId,
      ...fakeOwner,
    });
  });

  it("/api/v1/motor-vehicle (POST/PATCH/GET)", async () => {
    const fakeVehicle = {
      licensePlateNumber: "ZZZ-999",
      motorVehicleType: "SmallLight",
      manufactureDate: "2021-09-09",
      motorVehicleOwnerId: newOwnerId,
    };

    // console.log("fakeVehicle", fakeVehicle);
    const response = await request(app)
      .post("/api/v1/motor-vehicle")
      .send(fakeVehicle);

    // test POST
    expect(response.status).toEqual(HttpStatus.OK);
    newMotorId = response.body.id;
    // console.log("newMotorId", newMotorId);

    // test PATCH
    const newLicensePlateNumber = "ZZZ-000";
    const patchResponse = await request(app)
      .patch(`/api/v1/motor-vehicle/${newMotorId}`)
      .send({ licensePlateNumber: newLicensePlateNumber });

    expect(patchResponse.status).toEqual(HttpStatus.OK);

    fakeVehicle.licensePlateNumber = newLicensePlateNumber;

    // test GET
    const getResponse = await request(app).get(
      `/api/v1/motor-vehicle/${newMotorId}`
    );
    expect(getResponse.status).toEqual(HttpStatus.OK);
    expect(getResponse.body).toEqual(
      expect.objectContaining({
        id: newMotorId,
        licensePlateNumber: fakeVehicle.licensePlateNumber,
        manufactureDate: fakeVehicle.manufactureDate,
        motorVehicleType: fakeVehicle.motorVehicleType,
      })
    );
  });

  it("/api/v1/examination (POST/PATCH/GET)", async () => {
    const fakeExam = {
      mileage: 999,
      examinationDate: "2029-09-09",
      motorVehicleId: newMotorId,
    };

    // console.log("fakeExam", fakeExam);
    const response = await request(app)
      .post("/api/v1/examination")
      .send(fakeExam);

    // test POST
    expect(response.status).toEqual(HttpStatus.OK);
    newExamId = response.body.id;
    // console.log("newExamId", newExamId);

    // test PATCH
    const newMileage = 111;
    const patchResponse = await request(app)
      .patch(`/api/v1/examination/${newExamId}`)
      .send({ mileage: newMileage });

    expect(patchResponse.status).toEqual(HttpStatus.OK);

    fakeExam.mileage = newMileage;

    // test GET
    const getResponse = await request(app).get(
      `/api/v1/examination/${newExamId}`
    );
    expect(getResponse.status).toEqual(HttpStatus.OK);
    expect(getResponse.body).toEqual(
      expect.objectContaining({
        id: newExamId,
        mileage: fakeExam.mileage.toString(),
        examinationDate: fakeExam.examinationDate,
      })
    );
  });
});
