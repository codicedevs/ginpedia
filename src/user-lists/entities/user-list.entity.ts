import { Product } from "products/entities/product.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "users/entities/user.entity";

export enum ListType {
  WHISLIST = "deseados",
  PURCHASED = "bodega",
}

export class UserProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.lists)
  userId: User;

  @ManyToOne(() => Product, (product) => product.lists)
  productId: Product;

  @Column({
    type: "enum",
    enum: ListType,
    nullable: true,
  })
  type?: ListType;
}
