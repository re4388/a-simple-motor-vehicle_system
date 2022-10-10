import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MotorVehicleService } from './motor-vehicle.service';
import { CreateMotorVehicleDto } from './dto/create-motor-vehicle.dto';
import { UpdateMotorVehicleDto } from './dto/update-motor-vehicle.dto';

@Controller('motor-vehicle')
export class MotorVehicleController {
  constructor(private readonly motorVehicleService: MotorVehicleService) {}

  @Post()
  create(@Body() createMotorVehicleDto: CreateMotorVehicleDto) {
    return this.motorVehicleService.create(createMotorVehicleDto);
  }

  @Get()
  findAll() {
    return this.motorVehicleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motorVehicleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMotorVehicleDto: UpdateMotorVehicleDto) {
    return this.motorVehicleService.update(+id, updateMotorVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.motorVehicleService.remove(+id);
  }
}
