import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "users/users.service";
import { EmailService } from "email/email.service";
import { jwtSetting } from "settings";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "users/dto/user.dto";

export interface SSOData {
  data: {
    idToken: string | null;
    scopes: string[];
    serverAuthCode: string | null;
    user: {
      email: string;
      familyName: string;
      givenName: string;
      id: string;
      name: string;
      photo: string | null;
    };
  };
  type: string;
}
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private emailService: EmailService,
    private userService: UsersService
  ) {}
  /**
   * devuelve refresh token y acces token al usuario si las credenciales son correctas,
   * compara la pass enviada por el usuario en la request con la almacenada
   * y hasheada, lo hace mediante brcryp.compare que devolvera true or false
   * @param email
   * @param pass
   * @returns
   */

  async signIn(email: string, password?: string) {
    const user = await this.userRepository.findOneOrFail({
      where: { email: email },
    });

    if (password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new HttpException("El password no es correcto", 401);
      }
    }

    const payload = { sub: user.id, username: user.name, roles: user.roles };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtSetting.JWT_REFRESH_SECRET,
      expiresIn: jwtSetting.JWT_REFRESH_EXPIRES,
    });
    const access_token = await this.jwtService.signAsync(payload);
    const {
      password: pass,
      resetKey,
      resetKeyTimeStamp,
      ...userWithoutPass
    } = user;
    return {
      user: userWithoutPass,
      accessToken: access_token,
      refreshToken: refreshToken,
    };
  }

  /**
    el token que toma como parametro  es el refresh, si el refresh token es valido, entrega un access token
   * @param refreshToken 
   * @returns 
   */
  async refreshToken(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: jwtSetting.JWT_REFRESH_SECRET,
    });
    delete payload.iat;
    delete payload.exp;
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }

  async changePassword(sub: number, oldPassword: string, newPassword: string) {
    try {
      const user = await this.userRepository.findOneByOrFail({ id: sub });
      const match = await bcrypt.compare(oldPassword, user.password);
      if (match) {
        const hashedPassword = await bcrypt.hash(newPassword, 8);
        return this.userRepository.update(user.id, {
          password: hashedPassword,
        });
      } else {
        return new UnauthorizedException("La contraseña actual es incorrecta");
      }
    } catch (err) {
      const error = err as Error;
      throw new UnauthorizedException(error.message);
    }
  }

  /**
   * Esta funcion en primera instancia chequea si el usuario existe mediante su correo
   * Si existe crea un resetKey y un resetKeyTimeStamp, el segundo es una marca de tiempo para manejar la expiracion del primero
   * Por ultimo tanto resetKey como resetKeyTimeStamp se almacenan como propiedades en el usuario
   * Una vez creado resetkey y timeStamp se le envia al usuario por e mail el reset key para que pueda enviarlas
   * @param email
   * @returns
   */

  async passwordRecovery(email: string) {
    const user = await this.userRepository.findOneByOrFail({ email });
    const resetKey = Math.floor(Math.random() * (99999 - 10000) + 10000);
    const resetKeyTimeStamp = new Date().toISOString();
    await this.userRepository.update(user.id, {
      resetKey: resetKey.toString(),
      resetKeyTimeStamp: resetKeyTimeStamp,
    });
    await this.emailService.sendPasswordRecovery(user, resetKey);
    const userUpdated = await this.userRepository.findOneByOrFail({ email });
    return { userUpdated, resetKey };
  }
  /**
   * Esta funcion recibe lo referente en resetPassBody para actualizar la contraseña de un usuario que envia el resetKey que recibio
   * Compara que el resetKey sea igual al generado en su modelo (cuando solicito el cambio de contraseña), y tambien determina que no este expirado (12hs)
   * Si el proceso es correcto se actualiza la password del usuario y se establece resetKey en undefined, por haber sido utilizado
   * @param resetPassBody
   * @returns
   */

  async resetPassword(resetPassBody: {
    resetKey: string;
    email: string;
    password: string;
  }) {
    const user = await this.userRepository.findOneByOrFail({
      email: resetPassBody.email,
    });
    if (user.resetKey !== resetPassBody.resetKey) {
      throw new UnauthorizedException({ message: "Reset Key Invalid" });
    }
    // Reset password key, tiene 12 hs de validez
    if (!user.resetKeyTimeStamp) {
      throw new HttpException("resetKeyTimeStamp is undefined", 400);
    }
    const keyFromUser = new Date(user.resetKeyTimeStamp);
    const actualDate = new Date();
    const differenceInHours =
      Math.abs(actualDate.getTime() - keyFromUser.getTime()) / (1000 * 60 * 60);
    if (differenceInHours > 12) {
      throw new UnauthorizedException({
        message:
          "Your reset key has expired. It is valid for 12 hours. Please request the password change again.",
      });
    }
    // Actualiza la contraseña del usuario cuando el proceso de resetKey es exitoso
    await this.userRepository.update(user.id, {
      password: resetPassBody.password,
    });
    // Resetea el resetKey en el modelo de usuario cuando es usado exitosamente
    await this.userRepository.update(user.id, {
      resetKey: undefined,
    });
    return;
  }

  async validateGoogleUser(googleUser: CreateUserDto) {
    if (!googleUser.email) throw new UnauthorizedException("No hay mail");
    const user = await this.userRepository.findOneBy({
      email: googleUser.email,
    });
    if (user) return user;
    return this.userRepository.save(googleUser);
  }

  async validateFbUser(fbUser: CreateUserDto) {
    if (!fbUser.email) throw new UnauthorizedException("No hay mail");
    const user = await this.userRepository.findOneBy({
      email: fbUser.email,
    });
    if (user) return user;
    return this.userRepository.save(fbUser);
  }

  async signInSSO(info: SSOData) {
    console.log(info.data.user);
    let user = await this.userRepository.findOne({
      where: { email: info.data.user.email },
    });

    if (!user) {
      user = await this.userService.create({
        email: info.data.user.email,
        name: info.data.user.name,
      });
    }

    const payload = { sub: user.id, username: user.name, roles: user.roles };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtSetting.JWT_REFRESH_SECRET,
      expiresIn: jwtSetting.JWT_REFRESH_EXPIRES,
    });
    const access_token = await this.jwtService.signAsync(payload);
    const {
      password: pass,
      resetKey,
      resetKeyTimeStamp,
      ...userWithoutPass
    } = user;
    return {
      user: userWithoutPass,
      accessToken: access_token,
      refreshToken: refreshToken,
    };
  }
}
