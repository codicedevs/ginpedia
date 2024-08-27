import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1724772806149 implements MigrationInterface {
  name = " $npmConfigName1724772806149";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rating" DROP CONSTRAINT "FK_d8fc04f68cdc8650e9544e0867e"`
    );
    await queryRunner.query(
      `ALTER TABLE "rating" RENAME COLUMN "productIdId" TO "productIdProductId"`
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "productId" SERIAL NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "PK_429540a50a9f1fbf87efd047f35" PRIMARY KEY ("productId")`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "productName" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "image" character varying NOT NULL DEFAULT 'default-image.png'`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "origin" character varying NOT NULL DEFAULT ''`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "graduation" character varying NOT NULL DEFAULT ''`
    );
    await queryRunner.query(
      `ALTER TABLE "rating" ADD CONSTRAINT "FK_b6ac5683afd2bf355fe3d7e0a49" FOREIGN KEY ("productIdProductId") REFERENCES "product"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rating" DROP CONSTRAINT "FK_b6ac5683afd2bf355fe3d7e0a49"`
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "graduation"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "origin"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "image"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "productName"`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "PK_429540a50a9f1fbf87efd047f35"`
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "productId"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "name" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "product" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "rating" RENAME COLUMN "productIdProductId" TO "productIdId"`
    );
    await queryRunner.query(
      `ALTER TABLE "rating" ADD CONSTRAINT "FK_d8fc04f68cdc8650e9544e0867e" FOREIGN KEY ("productIdId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
