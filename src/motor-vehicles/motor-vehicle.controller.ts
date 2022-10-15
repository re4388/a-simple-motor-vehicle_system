import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
} from "@nestjs/common";
import { MotorVehicleService } from "./motor-vehicle.service";
import { CreateMotorVehicleDto } from "./dto/create-motor-vehicle.dto";
import { UpdateMotorVehicleDto } from "./dto/update-motor-vehicle.dto";
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Response } from 'express';

@ApiTags("motor-vehicle")
@Controller("motor-vehicle")
export class MotorVehicleController {
  constructor(
    private readonly motorService: MotorVehicleService // private readonly ownerService: MotorVehicleOwnerService
  ) { }

  @Post()
  @ApiNotFoundResponse({ description: "If motorVehicleOwner not exist!" })
  @ApiInternalServerErrorResponse({
    description: "Something went wrong while place order!",
  })
  @ApiOkResponse({
    description: "If createMotorVehicle successfully! return object",
  })
  async create(@Res() res: Response, @Body() dto: CreateMotorVehicleDto) {
    const result = await this.motorService.create(dto);
    console.log("result", result);

    if (result === -1) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send("motorVehicleOwner does not exist!");
    }

    return res.status(HttpStatus.OK).send({
      id: result.id,
      licensePlateNumber: result.licensePlateNumber,
      motorVehicleType: result.motorVehicleType,
      motorVehicleOwnerId: result.motorVehicleOwner.id,
      manufactureDate: result.manufactureDate,
    });
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  async update(
    @Param("id") id: string,
    @Res() res: Response,
    @Body() dto: UpdateMotorVehicleDto
  ) {
    const result = await this.motorService.update(id, dto);

    if (result === -1) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .send("licensePlateNumberAlreadyExists");
    }

    return res.status(HttpStatus.OK).send(result);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.motorService.findOne({ id: id });
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async remove(@Param("id", ParseUUIDPipe) id: string) {
    return await this.motorService.delete(id);
  }
}
