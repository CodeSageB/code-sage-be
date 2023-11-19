import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1699894400311 implements MigrationInterface {
    name = 'InitMigration1699894400311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Tag" ("id" BIGSERIAL NOT NULL, "tag" character varying NOT NULL, CONSTRAINT "UQ_33bc05aab66cb6e6644cbcaec82" UNIQUE ("tag"), CONSTRAINT "PK_00bd1ec314f664289873394731a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Blog" ("id" BIGSERIAL NOT NULL, "externalId" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_17b41207a933e2060f824e073fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "BlogTranslation" ("id" BIGSERIAL NOT NULL, "language" character varying NOT NULL, "title" text NOT NULL, "content" text NOT NULL, "blogId" bigint, CONSTRAINT "PK_0c0edc1767b622884e53108f131" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_tags_tag" ("blogId" bigint NOT NULL, "tagId" bigint NOT NULL, CONSTRAINT "PK_163bef1f79bd1f15b07f75e072d" PRIMARY KEY ("blogId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9572d27777384d535f77ed780d" ON "blog_tags_tag" ("blogId") `);
        await queryRunner.query(`CREATE INDEX "IDX_066934a149d9efba507443ce88" ON "blog_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "BlogTranslation" ADD CONSTRAINT "FK_6c93410eb16ba73866d5e554a07" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_tags_tag" ADD CONSTRAINT "FK_9572d27777384d535f77ed780d0" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "blog_tags_tag" ADD CONSTRAINT "FK_066934a149d9efba507443ce889" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_tags_tag" DROP CONSTRAINT "FK_066934a149d9efba507443ce889"`);
        await queryRunner.query(`ALTER TABLE "blog_tags_tag" DROP CONSTRAINT "FK_9572d27777384d535f77ed780d0"`);
        await queryRunner.query(`ALTER TABLE "BlogTranslation" DROP CONSTRAINT "FK_6c93410eb16ba73866d5e554a07"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_066934a149d9efba507443ce88"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9572d27777384d535f77ed780d"`);
        await queryRunner.query(`DROP TABLE "blog_tags_tag"`);
        await queryRunner.query(`DROP TABLE "BlogTranslation"`);
        await queryRunner.query(`DROP TABLE "Blog"`);
        await queryRunner.query(`DROP TABLE "Tag"`);
    }

}
