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
import Home from "./pages/Home/Home";
import PokemonDetail from "./pages/PokemonDetails/PokemonDetail";
import PokemonList from "./pages/PokemonList/PokemonList";
import NavBar from "./components/NavBar/NavBar";
import ROUTES from "./routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

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

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      staleTime: 60_000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {(process.env.NODE_ENV as string) === "development" && (
        <ReactQueryDevtools position="bottom" initialIsOpen={false} />
      )}{" "}
      <Provider store={store}>
        <Router>
          <NavBar />
          <AnimatedRoutes />
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
