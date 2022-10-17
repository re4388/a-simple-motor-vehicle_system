import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, Validate } from "class-validator";
import { IsNotExist } from "../../utils/validators/is-not-exists.validator";

export class CreateMotorVehicleOwnerDto {
  @ApiProperty({
    example: "Ben Hu",
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "test1@example.com",
    required: true,
  })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @Validate(IsNotExist, ["MotorVehicleOwner"], {
    message: "emailAlreadyExists",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "Don Man Road No.21",
    required: true,
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: "New Taipei City",
    required: true,
  })
  @IsNotEmpty()
  city: string;
}
