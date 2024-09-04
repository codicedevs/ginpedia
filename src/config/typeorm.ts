import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from "dotenv";
import { serverSetting } from "../settings";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: ".env" });

const config = {
  type: "postgres",
  host: `${serverSetting.DB_HOST}`,
  port: `${serverSetting.DB_PORT}`,
  username: `${serverSetting.DB_USERNAME}`,
  password: `${serverSetting.DB_PASSWORD}`,
  database: `${serverSetting.DB_DATABASE}`,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*{.ts,.js}"],
  autoLoadEntities: true,
  synchronize: true,
};

export default registerAs("typeorm", () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
