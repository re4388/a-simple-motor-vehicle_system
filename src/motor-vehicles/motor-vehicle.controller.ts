import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { MotorVehicleService } from './motor-vehicle.service';
import { CreateMotorVehicleDto } from './dto/create-motor-vehicle.dto';
import { UpdateMotorVehicleDto } from './dto/update-motor-vehicle.dto';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MotorVehicleOwnerService } from '../motor-vehicle-owners/motor-vehicle-owner.service';


@ApiTags('motor-vehicle')
@Controller('motor-vehicle')
export class MotorVehicleController {
  constructor(
    private readonly motorVehicleService: MotorVehicleService,
    private readonly ownerService: MotorVehicleOwnerService

  ) { }

  @Post()
  @ApiNotFoundResponse({ description: 'If motorVehicleOwner not exist!' })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while place order!',
  })
  @ApiOkResponse({ description: 'If createMotorVehicle successfully! return object' })
  async create(
    @Res() res,
    @Body() createMotorVehicleDto: CreateMotorVehicleDto) {

    const ownerId = createMotorVehicleDto.motorVehicleOwnerId
    const motorVehicleOwner = await this.ownerService.getById(ownerId);
    if (!motorVehicleOwner) {
      return res.status(HttpStatus.NOT_FOUND).send('motorVehicleOwner does not exist!');
    }

    const resultObj = await this.motorVehicleService.create(
      motorVehicleOwner,
      createMotorVehicleDto
    );


    return res.status(HttpStatus.OK).send({
      id: resultObj.id,
      licensePlateNumber: resultObj.licensePlateNumber,
      motorVehicleType: resultObj.motorVehicleType,
      motorVehicleOwnerId: resultObj.motorVehicleOwner.id,
      manufactureDate: resultObj.manufactureDate,
    });
  }

  // @Get()
  // findAll() {
  //   return this.motorVehicleService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.motorVehicleService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMotorVehicleDto: UpdateMotorVehicleDto) {
  //   return this.motorVehicleService.update(+id, updateMotorVehicleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.motorVehicleService.remove(+id);
  // }
}
