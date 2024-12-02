import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Headers,
  NotFoundException,
  Get,
  UseGuards,
  Req,
  Res,
} from "@nestjs/common";
import { Public } from "./public";
import { AuthService } from "./authentication.service";
import { SignInDTO } from "./dto/singin.dto";
import {
  CreateUserSSODto,
  RecoverPasswordDto,
  ResetPassDto,
} from "users/dto/user.dto";
import { FbAuthGuard, GoogleAuthGuard } from "./guards/o-auth.guard";
import { Request, Response } from "express";
import { User } from "users/entities/user.entity";
import { RequestWithUser } from "./auth.guard";
import { JWTPayload } from "types/payload";
import { UsersService } from "users/users.service";
import { changePasswordDto } from "./dto/password.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}
  /**
   * @param signInDto
   * @returns
   */

  @Public()
  @Post("signin")
  async signIn(@Body() signInDto: SignInDTO) {
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

  @Post("change-password")
  async changePassword(
    @Req() request: Request,
    @Body() changePasswordDto: changePasswordDto
  ) {
    const { sub } = request["user"] as JWTPayload;
    return this.authService.changePassword(
      sub,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword
    );
  }

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

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get("google/login")
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get("google/callback")
  async googleCallback(
    @Req() req: RequestWithUser,
    @Res() res: Response
  ): Promise<void> {
    if (req?.user?.email) {
      const response = await this.authService.signIn(req.user.email);
      res.redirect(`http://localhost:5173/${response.accessToken}`);
    }
  }

  @Get("/facebook/login")
  @UseGuards(FbAuthGuard)
  facebookLogin() {}

  @Get("/facebook/callback")
  @UseGuards(FbAuthGuard)
  async facebookCallback(
    @Req() req: RequestWithUser,
    @Res() res: Response
  ): Promise<void> {
    if (req?.user?.email) {
      const response = await this.authService.signIn(req.user.email);
      res.redirect(`http://localhost:5173/${response.accessToken}`);
    }
  }

  @Get("whoami")
  async whoamiUser(@Req() request: Request) {
    const { sub } = request["user"] as JWTPayload;
    const user = await this.userService.findByIdOrFail(sub);
    const { password, resetKey, resetKeyTimeStamp, ...userWithoutPass } = user;
    return userWithoutPass;
  }

  //prueba Stala

  @Public()
  @Post("signinSso")
  async signInSso(@Body() signInSsoDto: CreateUserSSODto) {
    try {
      const result = await this.authService.signInSSO(signInSsoDto);
      console.log("entro");
      return result;
    } catch (e) {
      const error = e as Error;
      console.error(error.message);
      // Manejar los errores, por ejemplo, lanzar un error 401 Unauthorized si las credenciales son inválidas.
      throw new UnauthorizedException("something happened with google sso");
    }
  }
}
