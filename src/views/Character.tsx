import { useParams } from "react-router-dom";
import { useNotion } from "../api";

export default function Character() {
  const { id } = useParams<{ id: string }>();

  const { data } = useNotion(
    `/databases/${import.meta.env.VITE_CHARACTER_DB_ID}/query`,
    {
      method: "POST",
      json: {
        filter: {
          property: "slug",
          formula: {
            string: {
              equals: id,
            },
          },
        },
      },
    }
  );

  return (
    <div>
      Character page : {data?.results[0].properties.name.title[0].plain_text}
    </div>
  );
}
