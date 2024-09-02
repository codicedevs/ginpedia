"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.smtpSettings = exports.jwtSetting = exports.serverSetting = void 0;
var dotenv = require("dotenv");
dotenv.config();
exports.serverSetting = Object.freeze({
    PORT: +((_a = process.env.SERVER_PORT) !== null && _a !== void 0 ? _a : 3000),
    DB_TYPE: process.env.DB_TYPE,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: +process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
});
exports.jwtSetting = Object.freeze({
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
});
exports.smtpSettings = Object.freeze({
    HOST: process.env.SMTP_SERVER,
    PORT: +process.env.SMTP_PORT,
    SECURE: false,
    AUTH_USER: process.env.SMTP_USERNAME,
    AUTH_PASS: process.env.SMTP_PASSWORD,
});
