import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2/";

export const fetchPokemon = async (limit: number, offset: number) => {
  const response = await axios.get(
    `${API_BASE_URL}/pokemon?limit=${limit}&offset${offset}`
  );
  return response.data.results;
};

export const fetchPokemonDetails = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${id}`);
    const { name, weight, height, types, sprites } = response.data;
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
