import { useNotion } from "../api";

export default function useCharacter(slug: string) {
  return useNotion(`/databases/${import.meta.env.VITE_CHARACTER_DB_ID}/query`, {
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
  });
}
