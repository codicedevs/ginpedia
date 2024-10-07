import { CreateUserDto } from "users/dto/user.dto";

export function welcomeMessage(userData: CreateUserDto) {
  return `Hola ${userData.name}, Bienvenido a Ginpedia!, te diste de alta con el correo ${userData.email}, disfruta de tus bebidas!`;
}
