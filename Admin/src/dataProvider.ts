import simpleRestProvider from "ra-data-simple-rest";
import {
  CreateParams,
  fetchUtils,
  FilterContextType,
  UpdateParams,
} from "react-admin";
import { BASE_URL } from "./config";
import { createUpdate } from "./utils/functions";

interface ParamsBase {
  meta: string;
  signal: AbortSignal;
}

interface GetOneParams extends ParamsBase {
  id: string;
  withCombination: boolean;
}

interface GetManyParams extends ParamsBase {
  pagination: {
    page: number;
    perPage: number;
  };
  sort: {
    field: string;
    order: string;
  };
  filter: any;
}

interface PostResource {
  data: any;
  meta: any;
}

interface PutResource extends PostResource {
  id: number;
  previousData: any;
}

export const httpClient = (url: string, options: fetchUtils.Options = {}) => {
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
  }
  return fetchUtils.fetchJson(url, options);
};

const baseProvider = simpleRestProvider("http://localhost:3000", httpClient);

export const dataProvider = {
  ...baseProvider,

  getOne: async (resource: string, params: GetOneParams) => {
    params.withCombination = false;
    if (resource === "products") {
      params.withCombination = true;
    }
    const url = `${BASE_URL}/${resource}/${params.id}?withCombination=${params.withCombination}`;
    return httpClient(url).then(({ json }) => ({
      data: json,
    }));
  },

  getList: async (resource: string, params: GetManyParams) => {
    const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
    const { field, order } = params.sort || { field: "id", order: "ASC" };
    const skip = (page - 1) * perPage;
    const take = perPage;
    const filter = params.filter;

    const query = {
      where: filter,
      skip,
      take,
      order: { [field]: order },
    };

    const queryString = Object.entries(query)
      .map(([key, value]) => {
        return `${key}=${JSON.stringify(value)}`;
      })
      .join("&");
    const url = `${BASE_URL}/${resource}?${queryString}`;

    const options = { signal: params?.signal };

    return httpClient(url, options).then(({ headers, json }) => {
      if (!headers.has("X-Total-Count")) {
        throw new Error(
          `The X-Total-Count header is missing in the HTTP Response.`,
        );
      }
      return {
        data: json,
        total: parseInt(headers.get("X-Total-Count")!, 10),
      };
    });
  },

  create: (resource: string, params: PostResource) => {
    if (resource === "products") {
      return createUpdate(resource, params, "POST");
    } else {
      return baseProvider.create(resource, params);
    }
  },

  update: (resource: string, params: PutResource) => {
    if (resource === "products") {
      return createUpdate(resource, params, "PUT");
    } else {
      return baseProvider.update(resource, params);
    }
  },
};
