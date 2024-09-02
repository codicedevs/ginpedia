import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1725048183714 implements MigrationInterface {
    name = ' $npmConfigName1725048183714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "productName" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "name" TO "productName"`);
    }

}
