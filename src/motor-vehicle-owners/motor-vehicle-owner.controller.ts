import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MotorVehicleOwnerService } from './motor-vehicle-owner.service';
import { CreateMotorVehicleOwnerDto } from './dto/create-motor-vehicle-owner.dto';
import { UpdateMotorVehicleOwnerDto } from './dto/update-motor-vehicle-owner.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('motor-vehicle-owner')
@Controller({
  path: 'motor-vehicle-owner',
  version: '1',
})
export class MotorVehicleOwnerController {
  constructor(private readonly motorVehicleOwnerService: MotorVehicleOwnerService) { }

  @Post()
  create(@Body() createMotorVehicleOwnerDto: CreateMotorVehicleOwnerDto) {
    return this.motorVehicleOwnerService.create(createMotorVehicleOwnerDto);
  }

  // @Get()
  // findAll() {
  //   return this.motorVehicleOwnerService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.motorVehicleOwnerService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMotorVehicleOwnerDto: UpdateMotorVehicleOwnerDto) {
  //   return this.motorVehicleOwnerService.update(+id, updateMotorVehicleOwnerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.motorVehicleOwnerService.remove(+id);
  // }
}
