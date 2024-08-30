"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
var config_1 = require("@nestjs/config");
var dotenv_1 = require("dotenv");
var settings_1 = require("../settings");
var typeorm_1 = require("typeorm");
(0, dotenv_1.config)({ path: ".env" });
var config = {
    type: "postgres",
    host: "".concat(settings_1.serverSetting.DB_HOST),
    port: "".concat(settings_1.serverSetting.DB_PORT),
    username: "".concat(settings_1.serverSetting.DB_USERNAME),
    password: "".concat(settings_1.serverSetting.DB_PASSWORD),
    database: "".concat(settings_1.serverSetting.DB_DATABASE),
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: false,
};
exports.default = (0, config_1.registerAs)("typeorm", function () { return config; });
exports.connectionSource = new typeorm_1.DataSource(config);
