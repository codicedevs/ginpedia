import { Product } from "products/entities/product.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "users/entities/user.entity";

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @ManyToOne(() => User, (user) => user.ratings)
  @JoinColumn({ name: "userId" })
  userId: User;

  @ManyToOne(() => Product, (product) => product.ratings)
  @JoinColumn({ name: "productId" })
  productId: Product;
}
