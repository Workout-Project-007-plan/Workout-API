import { MigrationInterface, QueryRunner } from "typeorm";

export class ExercisesUpdate1692812631314 implements MigrationInterface {
    name = 'ExercisesUpdate1692812631314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Exercises" ADD "series" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Exercises" DROP CONSTRAINT "PK_7b28dfc82f303b00ee1d6994333"`);
        await queryRunner.query(`ALTER TABLE "Exercises" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Exercises" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Exercises" ADD CONSTRAINT "PK_7b28dfc82f303b00ee1d6994333" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Exercises" DROP CONSTRAINT "PK_7b28dfc82f303b00ee1d6994333"`);
        await queryRunner.query(`ALTER TABLE "Exercises" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Exercises" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "Exercises" ADD CONSTRAINT "PK_7b28dfc82f303b00ee1d6994333" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "Exercises" DROP COLUMN "series"`);
    }

}
