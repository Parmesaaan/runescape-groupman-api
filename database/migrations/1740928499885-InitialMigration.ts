import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1740928499885 implements MigrationInterface {
    name = 'InitialMigration1740928499885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."task_task_type_enum" AS ENUM('DAILY', 'WEEKLY', 'MONTHLY')`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "task_type" "public"."task_task_type_enum" NOT NULL, "title" character varying NOT NULL, "description" character varying, "last_completed" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "PK_task_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6ea2c1c13f01b7a383ebbeaebb" ON "task" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "user_note" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "contents" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "PK_user_note_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."membership_role_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "membership" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."membership_role_enum" NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "group_id" uuid NOT NULL, CONSTRAINT "UQ_e7b6edd84fea1ecd89a17904a55" UNIQUE ("user_id", "group_id"), CONSTRAINT "PK_membership_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e9c72e8d29784031c96f5c6af8" ON "membership" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d7b446f7f7f75e661fce14a25f" ON "membership" ("group_id") `);
        await queryRunner.query(`CREATE TABLE "group_note" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "contents" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "author_id" uuid, "group_id" uuid NOT NULL, CONSTRAINT "PK_group_note_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_permission_level_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password_hash" character varying NOT NULL, "permission_level" "public"."user_permission_level_enum" NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_user_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `);
        await queryRunner.query(`CREATE TYPE "public"."join_request_status_enum" AS ENUM('PENDING', 'ACCEPTED', 'DENIED')`);
        await queryRunner.query(`CREATE TABLE "join_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."join_request_status_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "group_id" uuid NOT NULL, CONSTRAINT "PK_join_request_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7c0ba6d8872083faba7dac8a32" ON "join_request" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_72d5f6efc37398ab8773dc2b4b" ON "join_request" ("group_id") `);
        await queryRunner.query(`CREATE TABLE "group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8a45300fd825918f3b40195fbdc" UNIQUE ("name"), CONSTRAINT "PK_group_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8a45300fd825918f3b40195fbd" ON "group" ("name") `);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_note" ADD CONSTRAINT "FK_6595751ffb8e1f968857d7ba436" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "FK_e9c72e8d29784031c96f5c6af8d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "FK_d7b446f7f7f75e661fce14a25f0" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_note" ADD CONSTRAINT "FK_b5d3edac680111240ebba3d60b3" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_note" ADD CONSTRAINT "FK_64ac4efa6c5c2f3f0f3e324bc6d" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join_request" ADD CONSTRAINT "FK_7c0ba6d8872083faba7dac8a323" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join_request" ADD CONSTRAINT "FK_72d5f6efc37398ab8773dc2b4b6" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "join_request" DROP CONSTRAINT "FK_72d5f6efc37398ab8773dc2b4b6"`);
        await queryRunner.query(`ALTER TABLE "join_request" DROP CONSTRAINT "FK_7c0ba6d8872083faba7dac8a323"`);
        await queryRunner.query(`ALTER TABLE "group_note" DROP CONSTRAINT "FK_64ac4efa6c5c2f3f0f3e324bc6d"`);
        await queryRunner.query(`ALTER TABLE "group_note" DROP CONSTRAINT "FK_b5d3edac680111240ebba3d60b3"`);
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "FK_d7b446f7f7f75e661fce14a25f0"`);
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "FK_e9c72e8d29784031c96f5c6af8d"`);
        await queryRunner.query(`ALTER TABLE "user_note" DROP CONSTRAINT "FK_6595751ffb8e1f968857d7ba436"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a45300fd825918f3b40195fbd"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_72d5f6efc37398ab8773dc2b4b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7c0ba6d8872083faba7dac8a32"`);
        await queryRunner.query(`DROP TABLE "join_request"`);
        await queryRunner.query(`DROP TYPE "public"."join_request_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_permission_level_enum"`);
        await queryRunner.query(`DROP TABLE "group_note"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d7b446f7f7f75e661fce14a25f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e9c72e8d29784031c96f5c6af8"`);
        await queryRunner.query(`DROP TABLE "membership"`);
        await queryRunner.query(`DROP TYPE "public"."membership_role_enum"`);
        await queryRunner.query(`DROP TABLE "user_note"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ea2c1c13f01b7a383ebbeaebb"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TYPE "public"."task_task_type_enum"`);
    }

}
