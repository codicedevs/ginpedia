import * as fs from "fs";
import { BgGreen, BgYellow, FgRed, Reset } from "./console";

/**
 * Obtiene la configuración del protocolo del servidor, http o https según si encuentra los certificados o no.
 * @returns Devuelve los parámetros para la configuración del protocolo
 */
export function getProtocolConfig() {
  let key: string | Buffer = "";
  let cert: string | Buffer = "";
  let protocol: "http" | "https" | undefined;
  if (process.env.SSL_PRIVATE_KEY && process.env.SSL_CERT)
    try {
      console.log(`Config ${BgGreen}HTTPS${Reset} Protocol...`);
      key = fs.readFileSync(process.env.SSL_PRIVATE_KEY);
      cert = fs.readFileSync(process.env.SSL_CERT);
      protocol = "https";
    } catch (error) {
      protocol = undefined;
      console.log(`${FgRed}Failed to config HTTPS Protocol${Reset}`);
      console.error(error);
    }
  if (!protocol) {
    console.log(`Config ${BgYellow}HTTP${Reset} Protocol...`);
    key = "";
    cert = "";
    protocol = "http";
  }
  process.env.PROTOCOL = protocol;
  return { key, cert, protocol };
}
