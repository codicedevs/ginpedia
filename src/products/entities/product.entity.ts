import { Bookmark } from "bookmarks/entities/bookmark.entity";
import { Rating } from "ratings/entities/rating.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

export enum ProductType {
  GIN = "gin",
  TONICA = "tonica",
  ESPECIA = "especia",
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  productName?: string;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: ProductType,
    nullable: true,
  })
  type?: ProductType;

  @Column({ nullable: true })
  image?: string;

  @Column()
  origin?: string;

  @Column()
  graduation?: string;

  @OneToMany(() => Rating, (rating) => rating.product)
  ratings: Rating[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.product)
  bookmarks: Bookmark[];
}
