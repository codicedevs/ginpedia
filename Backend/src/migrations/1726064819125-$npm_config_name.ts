import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1726064819125 implements MigrationInterface {
  name = " $npmConfigName1726064819125";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "rating" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "rating"`);
  }
}
