import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import PokemonList from "./pages/PokemonList";
import NavBar from "./components/Navbar";
import ROUTES from "./routes";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.pokemonList} element={<PokemonList />} />
        <Route
          path={ROUTES.pokemonDetails(":id")}
          element={<PokemonDetail />}
        />
      </Routes>
    </Router>
  );
}

export default App;
