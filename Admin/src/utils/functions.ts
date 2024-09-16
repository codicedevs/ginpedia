import { fetchUtils } from "react-admin";
import { BASE_URL } from "../config";
import { httpClient } from "../dataProvider";

export function createUpdate(resource: string, params: any, method: string) {
  let url = `${BASE_URL}/${resource}`;
  const { image, ...rest } = params.data;
  if (method === "PUT") url += `/${params.id}`;
  return httpClient(url, {
    method: method,
    body: JSON.stringify(rest),
  }).then(({ json }) => {
    if (image?.rawFile) {
      const imageFormData = new FormData();
      imageFormData.append("file", image.rawFile);
      fetchUtils
        .fetchJson(`${BASE_URL}/${resource}/${json.id}/upload`, {
          method: "POST",
          body: imageFormData,
        })
        .then(() => {
          return { data: json };
        });
    }
    return {
      data: json,
    };
  });
}
