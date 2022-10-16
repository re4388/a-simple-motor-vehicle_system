import { MigrationInterface, QueryRunner } from "typeorm";

export class init1665909443375 implements MigrationInterface {
    name = 'init1665909443375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "motor_vehicle_owner" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "email" character varying NOT NULL, "address" character varying(200) NOT NULL, "city" character varying(200) NOT NULL, CONSTRAINT "UQ_08d3425235acf04fa5d4d372c50" UNIQUE ("email"), CONSTRAINT "PK_4d755241e72f26b94fc6744401f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."motor_vehicle_motorvehicletype_enum" AS ENUM('SmallLight', 'RegularLight', 'RegularHeavy', 'BigHeavy')`);
        await queryRunner.query(`CREATE TABLE "motor_vehicle" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "licensePlateNumber" character varying(7) NOT NULL, "motorVehicleType" "public"."motor_vehicle_motorvehicletype_enum" NOT NULL, "manufactureDate" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "motorVehicleOwnerId" uuid, CONSTRAINT "UQ_497768f3c2e64efb0e1c9641adb" UNIQUE ("licensePlateNumber"), CONSTRAINT "PK_7d5440a6ddf356372ff85eab238" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "examination" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "examinationDate" date NOT NULL, "mileage" numeric(8) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "motorVehicleId" uuid, CONSTRAINT "PK_de7c2a81d379fdf37174356fc12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "motor_vehicle" ADD CONSTRAINT "FK_25bd76e676ded70eac2564a51ea" FOREIGN KEY ("motorVehicleOwnerId") REFERENCES "motor_vehicle_owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "examination" ADD CONSTRAINT "FK_c8cea02f1e872ae580113ff53fc" FOREIGN KEY ("motorVehicleId") REFERENCES "motor_vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "examination" DROP CONSTRAINT "FK_c8cea02f1e872ae580113ff53fc"`);
        await queryRunner.query(`ALTER TABLE "motor_vehicle" DROP CONSTRAINT "FK_25bd76e676ded70eac2564a51ea"`);
        await queryRunner.query(`DROP TABLE "examination"`);
        await queryRunner.query(`DROP TABLE "motor_vehicle"`);
        await queryRunner.query(`DROP TYPE "public"."motor_vehicle_motorvehicletype_enum"`);
        await queryRunner.query(`DROP TABLE "motor_vehicle_owner"`);
    }

}
