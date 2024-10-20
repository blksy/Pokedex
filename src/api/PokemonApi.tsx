import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2/";

export const fetchPokemon = async (offset: number, limit: number) => {
  const response = await axios.get(
    `${API_BASE_URL}pokemon?offset=${offset}&limit=${limit}`
  );
  return response.data.results;
};
export const fetchPokemonDetails = async (pokemonName: string) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    return {
      name: response.data.name,
      sprite: response.data.sprites.other["official-artwork"].front_default,
      types: response.data.types.map((type: any) => type.type.name),
      height: response.data.height,
      weight: response.data.weight,
      abilities: response.data.abilities.map(
        (ability: any) => ability.ability.name
      ),
    };
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    throw error;
  }
};
