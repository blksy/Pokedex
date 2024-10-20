const ROUTES = {
  home: "/",
  pokemonList: "/pokemon/list",
  pokemonDetails: (pokemonName: string) => `/pokemon/${pokemonName}`,
};
export default ROUTES;
