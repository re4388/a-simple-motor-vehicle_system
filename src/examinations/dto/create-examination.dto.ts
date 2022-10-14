import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  Max,
  Min,
  Validate,
} from "class-validator";
import { IsNotExist } from "../../utils/validators/is-not-exists.validator";
import { isUUID } from "../../utils/validators/is-uuid-valid";

export class CreateExaminationDto {
  @ApiProperty({
    example: "2321",
    required: true,
  })
  @IsNotEmpty({ message: "mustBeNotEmpty" })
  @IsInt()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @ApiProperty({
    example: "2022-01-01",
    required: true,
  })
  @IsNotEmpty({ message: "mustBeNotEmpty" })
  @Type(() => Date)
  examinationDate: Date;

  @ApiProperty({
    example: "12c3746e-7d15-418f-a883-ca4869bca372",
    description: "motorVehicle id",
    required: true,
  })
  @Validate(isUUID, {
    message: "mustBeValidUUID",
  })
  @IsNotEmpty()
  motorVehicleId: string;
}

// const examination00 = this.examRepo.create({
//     motorVehicle: motorVehicle0,
// })
