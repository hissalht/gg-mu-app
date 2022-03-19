import { Link, Route, Routes } from "react-router-dom";
import { useNotion } from "./api";
import Character from "./views/Character";
import Home from "./views/Home";

interface CharacterResult {
  results: Array<{
    id: string;
    properties: {
      name: {
        title: Array<{ text: { content: string } }>;
      };
      slug: {
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

  return (
    <div className="App">
      <p>Hello world</p>
      {data && (
        <ul>
          {data.results.map((character) => (
            <li key={character.id}>
              <Link
                to={"/characters/" + character.properties.slug.formula.string}
              >
                {character.properties.name.title[0].text.content}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters/:id" element={<Character />} />
      </Routes>
    </div>
  );
}

export default App;
