import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "authentication/authentication.service";
import oauthConfig from "authentication/config/oauth.config";
import { Strategy } from "passport-facebook";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor(
    @Inject(oauthConfig.KEY)
    private oauthConfiguration: ConfigType<typeof oauthConfig>,
    private authService: AuthService
  ) {
    super({
      clientID: oauthConfiguration.facebook.clientID,
      clientSecret: oauthConfiguration.facebook.clientSecret,
      callbackURL: oauthConfiguration.facebook.callbackURL,
      scope: ["email", "public_profile"],
      profileFields: ["id", "emails", "displayName"],
    });
  }
  async validate(
    accessToken: string,
    refresToken: string,
    public_profile: any,
    done: (err: any, user: any, info?: any) => void
  ) {
    const user = this.authService.validateFbUser({
      email: public_profile.emails[0].value,
      name: public_profile.displayName,
      password: "",
    });
    done(null, user);
  }
}
