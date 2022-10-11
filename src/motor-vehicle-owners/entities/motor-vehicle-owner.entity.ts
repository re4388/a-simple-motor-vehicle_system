import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { MotorVehicle } from '../../motor-vehicles/entities/motor-vehicle.entity';

@Entity()
export class MotorVehicleOwner extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 200 })
    name: string;

    @Column({ unique: true, nullable: false })
    email: string | null;

    @Column('varchar', { length: 200 })
    address: string;

    @Column('varchar', { length: 200 })
    city: string;

    @OneToMany(() => MotorVehicle, (MotorVehicle) => MotorVehicle.motorVehicleOwner)
    motorVehicles: MotorVehicle[];
}
