import { Route, Routes } from "react-router-dom";
import SiteHeader from "./component/SiteHeader";
import Character from "./views/Character";
import Home from "./views/Home";

function App() {
  return (
    <div className="App">
      <SiteHeader />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters/:id" element={<Character />} />
      </Routes>
    </div>
  );
}

export default App;
