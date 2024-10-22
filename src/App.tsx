import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import PokemonList from "./pages/PokemonList";
import NavBar from "./components/NavBar";
import ROUTES from "./routes";

function AnimatedRoutes() {
  const location = useLocation();

  const pageTransition = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path={ROUTES.home}
          element={
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransition}
              transition={{ duration: 1 }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path={ROUTES.pokemonList}
          element={
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransition}
              transition={{ duration: 1 }}
            >
              <PokemonList />
            </motion.div>
          }
        />
        <Route
          path={`/pokemon/:pokemonName`}
          element={
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransition}
              transition={{ duration: 1 }}
            >
              <PokemonDetail />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <AnimatedRoutes />
      </Router>
    </Provider>
  );
}

export default App;
