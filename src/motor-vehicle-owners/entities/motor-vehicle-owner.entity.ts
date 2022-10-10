import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { MotorVehicle } from '../../motor-vehicles/entities/motor-vehicle.entity';

@Entity()
export class MotorVehicleOwner extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 200 })
    name: string;

    // @Column('varchar', { length: 200 })
    // email: string;

    @Column({ unique: true, nullable: true })
    email: string | null;

    @Column('varchar', { length: 200 })
    address: string;

    @Column('varchar', { length: 200 })
    city: string;

    @OneToMany(() => MotorVehicle, (MotorVehicle) => MotorVehicle.motorVehicleOwner)
    motorVehicles: MotorVehicle[];
}
