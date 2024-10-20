import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2/";

export const fetchPokemon = async (offset: number, limit: number) => {
  const response = await axios.get(
    `${API_BASE_URL}pokemon?offset=${offset}&limit=${limit}`
  );
  return response.data.results;
};
export const fetchPokemonDetails = async (name: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}pokemon/${name}`);
    const { weight, height, types, sprites } = response.data;
    const pokemonTypes = types.map((typeObj: any) => typeObj.type.name);
    return {
      name,
      weight,
      height,
      types: pokemonTypes,
      sprite: sprites.front_default,
    };
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    throw error;
  }
};
