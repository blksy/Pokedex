const ROUTES = {
  home: "/",
  pokemonList: "/pokemon/list",
  pokemonDetails: (name: string) => `/pokemon/${name}`,
};
export default ROUTES;
