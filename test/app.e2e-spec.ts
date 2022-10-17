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
    // console.log("newExamId", newExamId);
    // console.log("newMotorId", newMotorId);
    // console.log("newOwnerId", newOwnerId);
    await request(app).delete(`/api/v1/examination/${newExamId}`)
      .then(async () => {
        await request(app).delete(`/api/v1/motor-vehicle/${newMotorId}`)
      }).then(async () => {
        await request(app).delete(`/api/v1/motor-vehicle-owner/${newOwnerId}`)
      })
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


  it("/api/motor-vehicle-owner (POST) BAD_REQUEST when no name field ", async () => {
    const fakeOwner = {
      email: "e2eUser@example.com",
      address: "Don Man Road No.21",
      city: "Taichung City",
    };
    // test POST
    const response = await request(app)
      .post("/api/v1/motor-vehicle-owner")
      .send(fakeOwner);

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body.message[0]).toEqual('name should not be empty');
  });


  it("/api/motor-vehicle-owner (POST) BAD_REQUEST when no email field ", async () => {
    const fakeOwner = {
      name: "e2eUser",
      address: "Don Man Road No.21",
      city: "Taichung City",
    };
    // test POST
    const response = await request(app)
      .post("/api/v1/motor-vehicle-owner")
      .send(fakeOwner);

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body.message[0]).toEqual('email should not be empty');
  });

  it("/api/motor-vehicle-owner (POST) BAD_REQUEST when no address field ", async () => {
    const fakeOwner = {
      name: "e2eUser",
      email: "abc@gmail.com",
      city: "Taichung City",
    };
    // test POST
    const response = await request(app)
      .post("/api/v1/motor-vehicle-owner")
      .send(fakeOwner);

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body.message[0]).toEqual('address should not be empty');
  });

  it("/api/motor-vehicle-owner (POST) BAD_REQUEST when no city field ", async () => {
    const fakeOwner = {
      name: "e2eUser",
      address: "Don Man Road No.21",
      email: "abc@gmail.com",
    };
    // test POST
    const response = await request(app)
      .post("/api/v1/motor-vehicle-owner")
      .send(fakeOwner);

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body.message[0]).toEqual('city should not be empty');
  });

  it("/api/motor-vehicle-owner (POST) BAD_REQUEST when email is not valid ", async () => {
    const fakeOwner = {
      name: "e2eUser",
      address: "Don Man Road No.21",
      email: "this is not valid email",
      city: "Taichung City",
    };
    // test POST
    const response = await request(app)
      .post("/api/v1/motor-vehicle-owner")
      .send(fakeOwner);

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body.message[0]).toEqual('email must be an email');
  });

  it("/api/motor-vehicle-owner (POST) BAD_REQUEST when email is duplicated ", async () => {

    let e2eUserV2Id: string

    const fakeOwner = {
      name: "e2eUserV2",
      address: "Don Man Road No.21",
      email: "aaa@gmail.com",
      city: "Taichung City",
    };

    const response1 = await request(app)
      .post("/api/v1/motor-vehicle-owner")
      .send(fakeOwner)
    e2eUserV2Id = response1.body.id;


    const response2 = await request(app)
      .post("/api/v1/motor-vehicle-owner")
      .send(fakeOwner);

    expect(response2.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(response2.body.message[0]).toEqual('emailAlreadyExists');


    // clear up db
    await request(app).delete(`/api/v1/motor-vehicle-owner/${e2eUserV2Id}`)
  });




});
