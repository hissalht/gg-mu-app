import { useParams } from "react-router-dom";
import useCharacter from "../hooks/useCharacter";

export default function Character() {
  const { id } = useParams<{ id: string }>();
  const { data } = useCharacter(id!);

  return (
    <div>
      Character page : {data?.results[0].properties.name.title[0].plain_text}
    </div>
  );
}
