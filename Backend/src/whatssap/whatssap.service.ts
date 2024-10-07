import { Injectable, OnModuleInit } from "@nestjs/common";
//@ts-ignore
import { Client, LocalAuth } from "whatsapp-web.js";
import * as fs from "fs";
import * as path from "path";
//@ts-ignore
import * as qrcode from "qrcode-terminal";

@Injectable()
export class WhatssapService implements OnModuleInit {
  private client: Client;
  private isClientReady = false;

  onModuleInit() {
    this.initializeWhatsApp();
  }

  private initializeWhatsApp() {
    this.client = new Client({
      puppeteer: {
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
      authStrategy: new LocalAuth({ clientId: "client-one" }),
    });

    this.client.once("ready", () => {
      console.log("Client is ready!");
    });
    this.client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });

    this.client.on("message", (message) => {
      console.log(message.body);
    });

    this.client.on("auth_failure", (msg) => {
      console.error("Error de autenticación: ", msg);
    });

    this.client.initialize();
  }

  async sendMessage(to: string, message: string): Promise<void> {
    console.log(to, message);
    const chatId = to.substring(1) + "@c.us";
    try {
      await this.client.sendMessage(chatId, message);

      console.log("mensaje enviado a ", chatId);
    } catch (err) {
      console.error("algo paso", err);
    }
  }
}
