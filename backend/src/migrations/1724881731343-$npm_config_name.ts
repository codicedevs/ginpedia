import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1724881731343 implements MigrationInterface {
    name = ' $npmConfigName1724881731343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rating" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "userId" integer, "productProductId" integer, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."product_type_enum" AS ENUM('gin', 'tonica', 'especia')`);
        await queryRunner.query(`CREATE TABLE "product" ("productId" SERIAL NOT NULL, "productName" character varying NOT NULL, "description" character varying NOT NULL, "type" "public"."product_type_enum", "image" character varying, "origin" character varying NOT NULL, "graduation" character varying NOT NULL, CONSTRAINT "PK_429540a50a9f1fbf87efd047f35" PRIMARY KEY ("productId"))`);
        await queryRunner.query(`CREATE TYPE "public"."bookmark_type_enum" AS ENUM('deseados', 'bodega')`);
        await queryRunner.query(`CREATE TABLE "bookmark" ("id" SERIAL NOT NULL, "type" "public"."bookmark_type_enum" NOT NULL, "userId" integer, "productProductId" integer, CONSTRAINT "PK_b7fbf4a865ba38a590bb9239814" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_roles_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying, "roles" "public"."user_roles_enum" array NOT NULL DEFAULT '{user}', "password" character varying NOT NULL, "resetKey" character varying, "resetKeyTimeStamp" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_ad236228ea5a6fe872aaf4cc720" FOREIGN KEY ("productProductId") REFERENCES "product"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_e389fc192c59bdce0847ef9ef8b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_8887ff4e3d87984721940586c27" FOREIGN KEY ("productProductId") REFERENCES "product"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_8887ff4e3d87984721940586c27"`);
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_e389fc192c59bdce0847ef9ef8b"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_ad236228ea5a6fe872aaf4cc720"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_roles_enum"`);
        await queryRunner.query(`DROP TABLE "bookmark"`);
        await queryRunner.query(`DROP TYPE "public"."bookmark_type_enum"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_type_enum"`);
        await queryRunner.query(`DROP TABLE "rating"`);
    }

}
