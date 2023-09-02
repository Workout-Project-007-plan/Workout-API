import { MigrationInterface, QueryRunner } from "typeorm";

export class PasswordResetFix1693670962710 implements MigrationInterface {
    name = 'PasswordResetFix1693670962710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "pssword_reseted_at" TO "password_reseted_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "password_reseted_at" TO "pssword_reseted_at"`);
    }

}
