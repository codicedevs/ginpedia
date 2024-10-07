import { Body, Controller, Param, Post } from "@nestjs/common";
import { WhatssapService } from "./whatssap.service";
import { Public } from "authentication/public";

@Controller("whatssap")
export class WhatssapController {
  constructor(private readonly whatssapService: WhatssapService) {}
  @Public()
  @Post("send-message")
  async sendMessage(
    @Param("phone") phone: string,
    @Param("message") message: string
  ) {
    this.whatssapService.sendMessage("+5493416722672", "Hola Martin");
  }
}
