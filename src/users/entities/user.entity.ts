import { Role } from "authorization/role.enum";
import { Product } from "products/entities/product.entity";
import { UserProductRating } from "ratings/entities/rating.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true }) // esto evita crear dos usuarios con el mismo e mail
  email: string;

  @OneToMany(
    () => UserProductRating,
    (userProductRating) => userProductRating.user
  )
  userProductRating: UserProductRating[];

  @Column()
  password: string;

  @Column({ nullable: true })
  resetKey?: string;

  @Column({ nullable: true })
  resetKeyTimeStamp?: string;

  @Column({
    type: "enum",
    array: true,
    enum: Role,
    default: [Role.User], // Por defecto, el usuario tiene un rol,
  })
  roles: Role[];
}
