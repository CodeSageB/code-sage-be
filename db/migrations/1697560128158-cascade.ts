import { MigrationInterface, QueryRunner } from "typeorm";

export class Cascade1697560128158 implements MigrationInterface {
    name = 'Cascade1697560128158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "BlogTranslation" DROP CONSTRAINT "FK_6c93410eb16ba73866d5e554a07"`);
        await queryRunner.query(`ALTER TABLE "Tag" DROP CONSTRAINT "FK_4f6b7f3fcc95bba375fd138483c"`);
        await queryRunner.query(`ALTER TABLE "BlogTranslation" ADD CONSTRAINT "FK_6c93410eb16ba73866d5e554a07" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Tag" ADD CONSTRAINT "FK_4f6b7f3fcc95bba375fd138483c" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tag" DROP CONSTRAINT "FK_4f6b7f3fcc95bba375fd138483c"`);
        await queryRunner.query(`ALTER TABLE "BlogTranslation" DROP CONSTRAINT "FK_6c93410eb16ba73866d5e554a07"`);
        await queryRunner.query(`ALTER TABLE "Tag" ADD CONSTRAINT "FK_4f6b7f3fcc95bba375fd138483c" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "BlogTranslation" ADD CONSTRAINT "FK_6c93410eb16ba73866d5e554a07" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
