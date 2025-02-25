import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1740521848153 implements MigrationInterface {
    name = 'InitialMigration1740521848153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "note" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "contents" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "group_id" uuid, CONSTRAINT "PK_note_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_note_user_id" ON "note" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_note_group_id" ON "note" ("group_id") `);
        await queryRunner.query(`CREATE TYPE "public"."task_task_type_enum" AS ENUM('DAILY', 'WEEKLY', 'MONTHLY')`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "task_type" "public"."task_task_type_enum" NOT NULL, "title" character varying NOT NULL, "description" character varying, "last_completed" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "group_id" uuid, CONSTRAINT "PK_task_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_task_user_id" ON "task" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_task_group_id" ON "task" ("group_id") `);
        await queryRunner.query(`CREATE TABLE "group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_group_name" UNIQUE ("name"), CONSTRAINT "PK_group_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password_hash" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_user_username" UNIQUE ("username"), CONSTRAINT "PK_user_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_user" ("group_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_8c8ce37e281754b6d2b50af9561" PRIMARY KEY ("group_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d339f18d53e39b898da78bbabb" ON "group_user" ("group_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0837be536f0f518052a7bef2e0" ON "group_user" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_note_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_note_group" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_task_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_task_group" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_user" ADD CONSTRAINT "FK_group_users_group_id" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_user" ADD CONSTRAINT "FK_group_users_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_user" DROP CONSTRAINT "FK_group_users_user_id"`);
        await queryRunner.query(`ALTER TABLE "group_user" DROP CONSTRAINT "FK_group_users_group_id"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_task_group"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_task_user"`);
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_note_group"`);
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_note_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0837be536f0f518052a7bef2e0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d339f18d53e39b898da78bbabb"`);
        await queryRunner.query(`DROP TABLE "group_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_task_group_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_task_user_id"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TYPE "public"."task_task_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_note_group_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_note_user_id"`);
        await queryRunner.query(`DROP TABLE "note"`);
    }

}
