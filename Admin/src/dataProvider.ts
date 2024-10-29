import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";
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

const baseProvider = simpleRestProvider(BASE_URL, httpClient);

export const dataProvider = {
  ...baseProvider,

  getOne: async (resource: string, params: GetOneParams) => {
    params.withCombination = false;
    if (resource === "products") {
      params.withCombination = true;
    }
    const url = `${BASE_URL}/${resource}/${params.id}?withCombination=${params.withCombination}`;
    const res = await httpClient(url).then(({ json }) => ({
      data: json,
    }));
    if (resource === "products") {
      const product: any = {
        data: { ...res.data.product },
      };

      if (product.data.combinations) {
        product.data.combinations = product.data.combinations.map(
          (c: any) => c.id,
        );
      }
      return product;
    }
    return res;
  },

  getList: async (resource: string, params: GetManyParams) => {
    const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
    const { field, order } = params.sort || { field: "id", order: "ASC" };
    const skip = (page - 1) * perPage;
    const take = perPage;
    let filter = params.filter;

    const search = filter.q;
    if (search) {
      delete filter.q,
        (filter = {
          ...filter,
          name: { like: search },
        });
    }

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
