import { Module } from "@nestjs/common";
import { WhatssapService } from "./whatssap.service";
import { WhatssapController } from "./whatssap.controller";

@Module({
  controllers: [WhatssapController],
  providers: [WhatssapService],
  exports: [WhatssapService],
})
export class WhatssapModule {}
