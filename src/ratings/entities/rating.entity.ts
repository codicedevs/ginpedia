import { Product } from "products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "users/entities/user.entity";

@Entity()
export class UserProductRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rate: number;

  @ManyToOne(() => User, (user) => user.userProductRating)
  user: User;

  @ManyToOne(() => Product, (product) => product.UserProductRating)
  product: Product;
}
