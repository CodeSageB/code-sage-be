import { MigrationInterface, QueryRunner } from "typeorm";

export class CREATEBLOG1693498732431 implements MigrationInterface {
    name = 'CREATEBLOG1693498732431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Blog" ("id" BIGSERIAL NOT NULL, "externalId" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "content" text NOT NULL, "tags" text array NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_17b41207a933e2060f824e073fd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Blog"`);
    }

}
