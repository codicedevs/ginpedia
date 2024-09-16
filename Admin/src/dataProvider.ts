import simpleRestProvider from "ra-data-simple-rest";
import { CreateParams, fetchUtils, UpdateParams } from "react-admin";
import { BASE_URL } from "./config";
import { createUpdate } from "./utils/functions";

type PostParams = {
  id: string;
  picture: {
    rawFile: File;
    src?: string;
  };
};

const createPostFormData = (
  params: CreateParams<PostParams> | UpdateParams<PostParams>,
) => {
  const formData = new FormData();
  params.data.picture?.rawFile &&
    formData.append("file", params.data.picture.rawFile);
  return formData;
};

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

  getOne: (resource: string, params: any) => {
    params.withCombination = false;
    if (resource === "products") {
      params.withCombination = true;
    }
    const url = `${BASE_URL}/${resource}/${params.id}?withCombination=${params.withCombination}`;
    return httpClient(url).then(({ json }) => ({
      data: json,
    }));
  },

  getList: (resource: string, params: any) => {
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

  create: (resource: string, params: any) => {
    if (resource === "products") {
      return createUpdate(resource, params, "POST");
    } else {
      return baseProvider.create(resource, params);
    }
  },

  update: (resource: string, params: any) => {
    if (resource === "products") {
      return createUpdate(resource, params, "PUT");
    } else {
      return baseProvider.update(resource, params);
    }
  },
};
