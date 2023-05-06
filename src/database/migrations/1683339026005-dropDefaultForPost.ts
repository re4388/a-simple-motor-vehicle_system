import { MigrationInterface, QueryRunner } from "typeorm";

export class yourNewDifInDb1683339026005 implements MigrationInterface {
    name = 'yourNewDifInDb1683339026005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_entity" ALTER COLUMN "removed_at" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_entity" ALTER COLUMN "removed_at" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
    }

}
