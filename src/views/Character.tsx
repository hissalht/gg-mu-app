import { useParams } from "react-router-dom";
import { useCharacter } from "../api/characters";

export default function Character() {
  const { id } = useParams<{ id: string }>();
  const { data } = useCharacter(id!);

  if (!data) {
    return <div>Loading...</div>;
  }

  return <div>Character page : {data[0].name}</div>;
}
