import { Middleware, SWRHook } from "swr";
import { useNotion } from "./notion";

export interface Character {
  id: string;
  name: string;
  slug: string;
}

const parseCharacters: Middleware =
  (useSWRNext: SWRHook) => (key, fetcher, config) => {
    const swr = useSWRNext<any>(key, fetcher, config);

    const characters = swr.data?.results.map((item: any) => ({
      id: item.id,
      name: item.properties.name.title[0].plain_text,
      slug: item.properties.slug.formula.string,
    }));

    return {
      ...swr,
      data: characters,
    };
  };

export function useCharacter(slug: string) {
  return useNotion<Character[]>(
    `/databases/${import.meta.env.VITE_CHARACTER_DB_ID}/query`,
    {
      method: "POST",
      json: {
        filter: {
          property: "slug",
          formula: {
            string: {
              equals: slug,
            },
          },
        },
      },
    },
    { use: [parseCharacters] }
  );
}

export function useCharacters() {
  return useNotion<Character[]>(
    `/databases/${import.meta.env.VITE_CHARACTER_DB_ID}/query`,
    {
      method: "POST",
    },
    { use: [parseCharacters] }
  );
}
