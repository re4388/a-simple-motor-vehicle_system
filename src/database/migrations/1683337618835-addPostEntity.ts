import { MigrationInterface, QueryRunner } from "typeorm";

export class yourNewDifInDb1683337618835 implements MigrationInterface {
    name = 'yourNewDifInDb1683337618835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post_entity" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "postId" character varying NOT NULL, "title" character varying, "body" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "removed_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_58a149c4e88bf49036bc4c8c79f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e55623412a2747775386b01a2a" ON "post_entity" ("userId", "postId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_e55623412a2747775386b01a2a"`);
        await queryRunner.query(`DROP TABLE "post_entity"`);
    }

}
