import { fetchUtils, useRecordContext } from "react-admin";
import { BASE_URL } from "../config";
import { httpClient } from "../dataProvider";

interface TruncatedTextFieldProps {
  source: string;
  record?: any;
}

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

export const TruncatedTextField = ({ source }: TruncatedTextFieldProps) => {
  const record = useRecordContext();
  const maxLength = 30;
  if (!record) return null;
  const text = record[source] || "";
  const truncatedText =
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  return <span>{truncatedText}</span>;
};
