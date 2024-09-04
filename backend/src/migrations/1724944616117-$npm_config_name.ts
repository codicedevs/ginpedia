import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1724944616117 implements MigrationInterface {
    name = ' $npmConfigName1724944616117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_ad236228ea5a6fe872aaf4cc720"`);
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_8887ff4e3d87984721940586c27"`);
        await queryRunner.query(`ALTER TABLE "rating" RENAME COLUMN "productProductId" TO "productId"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "productId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME CONSTRAINT "PK_429540a50a9f1fbf87efd047f35" TO "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER SEQUENCE "product_productId_seq" RENAME TO "product_id_seq"`);
        await queryRunner.query(`ALTER TABLE "bookmark" RENAME COLUMN "productProductId" TO "productId"`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_1fdf6f092aa907177771948f6a1" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_6b65efa3269b66681d18e344b9d" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_6b65efa3269b66681d18e344b9d"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_1fdf6f092aa907177771948f6a1"`);
        await queryRunner.query(`ALTER TABLE "bookmark" RENAME COLUMN "productId" TO "productProductId"`);
        await queryRunner.query(`ALTER SEQUENCE "product_id_seq" RENAME TO "product_productId_seq"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" TO "PK_429540a50a9f1fbf87efd047f35"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "id" TO "productId"`);
        await queryRunner.query(`ALTER TABLE "rating" RENAME COLUMN "productId" TO "productProductId"`);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_8887ff4e3d87984721940586c27" FOREIGN KEY ("productProductId") REFERENCES "product"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_ad236228ea5a6fe872aaf4cc720" FOREIGN KEY ("productProductId") REFERENCES "product"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
