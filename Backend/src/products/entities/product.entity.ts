import { Bookmark } from "bookmarks/entities/bookmark.entity";
import { Rating } from "ratings/entities/rating.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";

export enum ProductType {
  GIN = "gin",
  TONICA = "tonica",
  ESPECIA = "especia",
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name?: string;

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

  @Column({ nullable: true, type: "float" })
  rating?: number;

  @OneToMany(() => Rating, (rating) => rating.product)
  ratings: Rating[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.product)
  bookmarks: Bookmark[];

  @ManyToMany(() => Product, (product) => product.combinations)
  @JoinTable({
    name: "combinations",
    joinColumn: { name: "primaryProductId", referencedColumnName: "id" },
    inverseJoinColumn: {
      name: "secondaryProductId",
      referencedColumnName: "id",
    },
  })
  combinations: Product[];
}
