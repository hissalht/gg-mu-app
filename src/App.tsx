import { useNotion } from "./api";

interface CharacterResult {
  results: Array<{
    id: string;
    properties: {
      Name: {
        title: Array<{ text: { content: string } }>;
      };
      Portrait: {
        files: Array<{
          external: {
            url: string;
          };
        }>;
      };
      Slug: {
        formula: {
          string: string;
        };
      };
    };
  }>;
}

function App() {
  const { data, error } = useNotion<CharacterResult>(
    "/databases/" + import.meta.env.VITE_CHARACTER_DB_ID + "/query",
    { method: "POST" }
  );

  console.log({ data, error });

  return (
    <div className="App">
      <p>Hello world</p>
      {data && (
        <ul>
          {data.results.map((character) => (
            <li key={character.id}>
              {character.properties.Name.title[0].text.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
