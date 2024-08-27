import { Role } from "authorization/role.enum";
import { Rating } from "ratings/entities/rating.entity";
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

  @Column({ unique: true, nullable: true }) // esto evita crear dos usuarios con el mismo e mail
  email?: string;

  @OneToMany(() => Rating, (rating) => rating.userId)
  rating: Rating[];

  @Column({
    type: "enum",
    array: true,
    enum: Role,
    default: [Role.User], // Por defecto, el usuario tiene un rol,
  })
  roles: Role[];

  @Column()
  password: string;

  @Column({ nullable: true })
  resetKey?: string;

  @Column({ nullable: true })
  resetKeyTimeStamp?: string;
}
