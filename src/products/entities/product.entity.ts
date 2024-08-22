import { UserProductRating } from "ratings/entities/rating.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { User } from "users/entities/user.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: "gin" | "tonic" | "spice";

  @OneToMany(
    () => UserProductRating,
    (userProductRating) => userProductRating.product
  )
  UserProductRating: UserProductRating[];
}
