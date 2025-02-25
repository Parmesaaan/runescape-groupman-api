import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGroupTables1740479792901 implements MigrationInterface {
    name = 'CreateGroupTables1740479792901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_group_name" UNIQUE ("name"), CONSTRAINT "PK_group_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_members" ("group_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_group_members" PRIMARY KEY ("group_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_group_members_group_id" ON "group_members" ("group_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_group_members_user_id" ON "group_members" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "group_members" ADD CONSTRAINT "FK_group_members_group_id" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_members" ADD CONSTRAINT "FK_group_members_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_members" DROP CONSTRAINT "FK_group_members_user_id"`);
        await queryRunner.query(`ALTER TABLE "group_members" DROP CONSTRAINT "FK_group_members_group_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_group_members_user_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_group_members_group_id"`);
        await queryRunner.query(`DROP TABLE "group_members"`);
        await queryRunner.query(`DROP TABLE "group"`);
    }

}
