import { MigrationInterface, QueryRunner } from "typeorm";

export class IncludeExercisesRelation1692743601397 implements MigrationInterface {
    name = 'IncludeExercisesRelation1692743601397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Exercises" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "reps" integer NOT NULL, "effort" integer NOT NULL, "load" integer NOT NULL, "rest" integer NOT NULL, "link" character varying NOT NULL, "trainId" uuid, CONSTRAINT "PK_7b28dfc82f303b00ee1d6994333" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gender" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Exercises" ADD CONSTRAINT "FK_8f836cd13d78945b0c97fae52ae" FOREIGN KEY ("trainId") REFERENCES "trains"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Exercises" DROP CONSTRAINT "FK_8f836cd13d78945b0c97fae52ae"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TABLE "Exercises"`);
    }

}
