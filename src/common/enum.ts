enum MotorVehicleTypeEnum {
  SmallLight = 'SmallLight',
  RegularLight = 'RegularLight',
  RegularHeavy = 'RegularHeavy',
  BigHeavy = 'BigHeavy',
}

const validMotorVehicleType = [
  MotorVehicleTypeEnum.SmallLight.toString(),
  MotorVehicleTypeEnum.RegularLight.toString(),
  MotorVehicleTypeEnum.RegularHeavy.toString(),
  MotorVehicleTypeEnum.BigHeavy.toString(),
];

export { MotorVehicleTypeEnum, validMotorVehicleType };
