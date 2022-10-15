import { MotorVehicleTypeEnum } from "../src/common/enum"
import { MotorVehicleOwner } from "../src/motor-vehicle-owners/entities/motor-vehicle-owner.entity"
import { UpdateMotorVehicleDto } from "../src/motor-vehicles/dto/update-motor-vehicle.dto"
import { MotorVehicle } from "../src/motor-vehicles/entities/motor-vehicle.entity"

const ownerSeed = {
    name: "Ben Hu",
    email: "ABC-123",
    address: "home 23 road street 23",
    city: "Tainan"
}

const motorVehicleSeed0 = {
    licensePlateNumber: "AAA-111",
    manufactureDate: new Date("2022-01-01T00:30:00.000Z"),
    motorVehicleType: MotorVehicleTypeEnum.BigHeavy,
    motorVehicleOwnerId: "3bb84593-de0d-4901-b5af-d17e1d815ff4"
}

const motorVehicleSeed1 = {
    licensePlateNumber: "ZZZ-999",
    manufactureDate: new Date("2022-01-02T00:30:00.000Z"),
    motorVehicleType: MotorVehicleTypeEnum.RegularHeavy,
    motorVehicleOwnerId: "3bb84593-de0d-4901-b5af-d17e1d815ff4"
}

const examineSeed1 = {
    examinationDate: new Date("2022-01-01T00:30:00.000Z"),
    mileage: 123
}
const examineSeed12 = {
    examinationDate: new Date("2022-02-01T00:30:00.000Z"),
    mileage: 321
}


const owner = new MotorVehicleOwner()
owner.email = ownerSeed.email
owner.address = ownerSeed.address
owner.name = ownerSeed.name
owner.city = ownerSeed.city
owner.motorVehicles = []

const vehicle = new MotorVehicle()
vehicle.licensePlateNumber
vehicle.motorVehicleType = MotorVehicleTypeEnum.BigHeavy
vehicle.manufactureDate = new Date("2022-01-01T00:30:00.000Z")
vehicle.motorVehicleOwner = owner



export {
    motorVehicleSeed0,
    owner,
    vehicle,
    ownerSeed,

}