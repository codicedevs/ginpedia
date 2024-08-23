import { Rating } from "ratings/entities/rating.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { User } from "users/entities/user.entity";

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
  name: string;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: ProductType,
    nullable: true,
  })
  type?: ProductType;

  @OneToMany(() => Rating, (rating) => rating.productId)
  rating: Rating[];
}
