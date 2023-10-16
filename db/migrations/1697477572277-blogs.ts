import { MigrationInterface, QueryRunner } from "typeorm";

export class Blogs1697477572277 implements MigrationInterface {
    name = 'Blogs1697477572277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "BlogTranslation" ("id" BIGSERIAL NOT NULL, "language" character varying NOT NULL, "title" text NOT NULL, "content" text NOT NULL, "blogId" bigint, CONSTRAINT "PK_0c0edc1767b622884e53108f131" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Tag" ("id" BIGSERIAL NOT NULL, "tag" character varying NOT NULL, "blogId" bigint, CONSTRAINT "PK_00bd1ec314f664289873394731a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Blog" ("id" BIGSERIAL NOT NULL, "externalId" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_17b41207a933e2060f824e073fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "BlogTranslation" ADD CONSTRAINT "FK_6c93410eb16ba73866d5e554a07" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Tag" ADD CONSTRAINT "FK_4f6b7f3fcc95bba375fd138483c" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tag" DROP CONSTRAINT "FK_4f6b7f3fcc95bba375fd138483c"`);
        await queryRunner.query(`ALTER TABLE "BlogTranslation" DROP CONSTRAINT "FK_6c93410eb16ba73866d5e554a07"`);
        await queryRunner.query(`DROP TABLE "Blog"`);
        await queryRunner.query(`DROP TABLE "Tag"`);
        await queryRunner.query(`DROP TABLE "BlogTranslation"`);
    }

}
