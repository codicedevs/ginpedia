import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "authentication/authentication.service";
import oauthConfig from "authentication/config/oauth.config";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    @Inject(oauthConfig.KEY)
    private oauthConfiguration: ConfigType<typeof oauthConfig>,
    private authService: AuthService
  ) {
    super({
      clientID: oauthConfiguration.google.clientID,
      clientSecret: oauthConfiguration.google.clientSecret,
      callbackURL: oauthConfiguration.google.callbackURL,
      scope: ["email", "profile"],
    });
  }
  async validate(
    accessToken: string,
    refresToken: string,
    profile: any,
    done: VerifyCallback
  ) {
    const user = this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      name: profile.name.givenName,
      password: "",
    });
    done(null, user);
  }
}
