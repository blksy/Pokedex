const ROUTES = {
  home: "/",
  pokemonList: "/pokemon/list",
  pokemonDetails: (id: number | string) => `/pokemon/${id}`,
};
export default ROUTES;
