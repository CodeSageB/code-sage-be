import { MigrationInterface, QueryRunner } from "typeorm";

export class BlogTranslation1695404082649 implements MigrationInterface {
    name = 'BlogTranslation1695404082649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "BlogTranslation" ("id" BIGSERIAL NOT NULL, "language" character varying NOT NULL, "title" text NOT NULL, "content" text NOT NULL, "blogId" bigint, CONSTRAINT "PK_0c0edc1767b622884e53108f131" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Blog" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "Blog" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "BlogTranslation" ADD CONSTRAINT "FK_6c93410eb16ba73866d5e554a07" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "BlogTranslation" DROP CONSTRAINT "FK_6c93410eb16ba73866d5e554a07"`);
        await queryRunner.query(`ALTER TABLE "Blog" ADD "content" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Blog" ADD "title" text NOT NULL`);
        await queryRunner.query(`DROP TABLE "BlogTranslation"`);
    }

}
