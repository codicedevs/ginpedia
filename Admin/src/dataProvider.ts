import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  console.log("client");
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  } else if (!(options.headers instanceof Headers)) {
    options.headers = new Headers(options.headers);
  }

  const token = localStorage.getItem("token");
  if (token) {
    options.headers.set(
      "Authorization",
      `Bearer ${token.replace('"', "").replace('"', "")}`,
    );
  } else {
    console.log("Algo paso");
  }
  return fetchUtils.fetchJson(url, options);
};

export const dataProvider = simpleRestProvider(
  "http://localhost:3000",
  httpClient,
);
