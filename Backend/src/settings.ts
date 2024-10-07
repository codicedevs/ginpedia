import * as dotenv from "dotenv";
dotenv.config();

export const serverSetting = Object.freeze({
  PORT: +(process.env.SERVER_PORT ?? 3000),
  DB_TYPE: process.env.DB_TYPE,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: +(process.env.DB_PORT ?? 5432),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
});

export const jwtSetting = Object.freeze({
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
});

export const smtpSettings = Object.freeze({
  HOST: process.env.SMTP_SERVER!,
  PORT: +process.env.SMTP_PORT!,
  SECURE: false,
  AUTH_USER: process.env.SMTP_USERNAME,
  AUTH_PASS: process.env.SMTP_PASSWORD,
});

export const appSettings = Object.freeze({
  APP_NAME: process.env.APP_NAME,
});

export const whatssapSettings = Object.freeze({
  MONGODB_URI:
    "mongodb+srv:mongodb+srv://matiastrovant:mhjjqrxCRldG7UAb@omvtest.72ckbwy.mongodb.net/testWhatsapp",
});
