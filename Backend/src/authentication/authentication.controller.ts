import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Headers,
  NotFoundException,
} from "@nestjs/common";
import { Public } from "./public";
import { AuthService } from "./authentication.service";
import { SignInDTO } from "./dto/singin.dto";
import { RecoverPasswordDto, ResetPassDto } from "users/dto/user.dto";

@Controller("auth")
@Public() // todos son publicos con este decorador!
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * @param signInDto
   * @returns
   */

  @Post("signin")
  async signIn(@Body() signInDto: SignInDTO) {
    console.log(signInDto);
    try {
      const result = await this.authService.signIn(
        signInDto.email,
        signInDto.password
      );
      return result;
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
      // Manejar los errores, por ejemplo, lanzar un error 401 Unauthorized si las credenciales son inválidas.
      throw new UnauthorizedException("Invalid credentials");
    }
  }
  /**
   * @param refreshToken
   * @returns
   * esta ruta esta marcada como publica, pero si el refresh token no es valido, el servicio entraga un error de no autorizado
   */
  @Post("refresh-token")
  async refreshAccessToken(@Headers("refresh-token") refreshToken: string) {
    try {
      const result = await this.authService.refreshToken(refreshToken);
      return result;
    } catch (err) {
      const error = err as Error;
      throw new UnauthorizedException(error.message);
    }
  }
  /**
   * @param email
   * @returns
   */

  @Post("recover-password")
  async recoverPassword(@Body() recoverPassword: RecoverPasswordDto) {
    const result = await this.authService.passwordRecovery(
      recoverPassword.email
    );
    return {
      message: "Password recovery initiated successfully",
      data: result,
    };
  }
  /**
   * @param resetPass
   * @returns
   */

  @Post("reset-password")
  async resetPassword(@Body() resetPass: ResetPassDto) {
    await this.authService.resetPassword(resetPass);
    return { message: "Password reset successful" };
  }
}
