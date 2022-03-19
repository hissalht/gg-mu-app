import ky, { Options } from "ky";
import { merge } from "lodash-es";
import useSWR, { SWRConfiguration } from "swr";

export function fetchNotion(url: string, options: Options): Promise<any> {
  const defaultOptions = {
    credentials: "omit",
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_NOTION_INTEGRATION_TOKEN,
      "Notion-Version": import.meta.env.VITE_NOTION_API_VERSION,
    },
  };
  const mergedOptions = merge(defaultOptions, options);

  return ky("/api" + url, mergedOptions).json();
}

export function useNotion<T = any>(
  url: string,
  options?: Options,
  config?: SWRConfiguration
) {
  return useSWR<T>([url, options], fetchNotion, config);
}
