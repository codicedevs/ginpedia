import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class GoogleAuthGuard extends AuthGuard("google") {}
export class FbAuthGuard extends AuthGuard("facebook") {}
