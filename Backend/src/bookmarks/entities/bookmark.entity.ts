import { Product } from "products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "users/entities/user.entity";

export enum ListType {
  WISHLIST = "deseados",
  PURCHASED = "bodega",
}

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookmarks, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Product, (product) => product.bookmarks, {
    onDelete: "CASCADE",
  })
  product: Product;

  @Column({
    type: "enum",
    enum: ListType,
  })
  type: ListType;
}
