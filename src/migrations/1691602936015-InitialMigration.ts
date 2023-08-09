import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1691602936015 implements MigrationInterface {
    name = 'InitialMigration1691602936015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trains" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "status" boolean NOT NULL, CONSTRAINT "PK_e4a77c477e29608e7d17d17fb4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workout_plans" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "plan_type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "end_date" TIMESTAMP, "userId" uuid, "trainsId" uuid, CONSTRAINT "PK_9ae1bdd02db446a7541e2e5b161" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "height" integer NOT NULL, "age" integer NOT NULL, "weight" integer NOT NULL, "weight_goal" integer NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_adm" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "password_reset_token" character varying, "pssword_reseted_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_c0d176bcc1665dc7cb60482c817" UNIQUE ("password_reset_token"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workout_plans" ADD CONSTRAINT "FK_ff2ee5d107dfa46fbafa59d316e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_plans" ADD CONSTRAINT "FK_d6c05eb037af331961721ac71d5" FOREIGN KEY ("trainsId") REFERENCES "trains"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout_plans" DROP CONSTRAINT "FK_d6c05eb037af331961721ac71d5"`);
        await queryRunner.query(`ALTER TABLE "workout_plans" DROP CONSTRAINT "FK_ff2ee5d107dfa46fbafa59d316e"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "workout_plans"`);
        await queryRunner.query(`DROP TABLE "trains"`);
    }

}
