import { Button } from "@chakra-ui/react";
import { Link, Route, Routes } from "react-router-dom";
import { useNotion } from "./api";
import SiteHeader from "./component/SiteHeader";
import Character from "./views/Character";
import Home from "./views/Home";

function App() {
  return (
    <div className="App">
      <SiteHeader />
      {/* <nav>
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
      </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters/:id" element={<Character />} />
      </Routes>
    </div>
  );
}

export default App;
