import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, Max, Min, Validate } from "class-validator";
import { isUUID } from "../../utils/validators/is-uuid-valid";

export class CreateExaminationDto {
  @ApiProperty({
    example: "2321",
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @ApiProperty({
    example: "2022-01-01",
    required: true,
  })
  @IsNotEmpty()
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
