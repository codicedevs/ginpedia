import { Role } from "authorization/role.enum";
import { Bookmark } from "bookmarks/entities/bookmark.entity";
import { Rating } from "ratings/entities/rating.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true }) // esto evita crear dos usuarios con el mismo e mail
  email?: string;

  @OneToMany(() => Rating, (rating) => rating.user, {
    cascade: ["insert", "update"],
  })
  ratings: Rating[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user, {
    cascade: ["insert", "update"],
  })
  bookmarks: Bookmark[];

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
