import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2/";

export const fetchPokemon = async (offset: number, limit: number) => {
  const { data } = await axios.get(
    `${API_BASE_URL}pokemon?offset=${offset}&limit=${limit}`
  );
  return data.results;
};
export const fetchPokemonDetails = async (pokemonName: string) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}pokemon/${pokemonName}`);
    return {
      name: data.name,
      sprite: data.sprites.other["official-artwork"].front_default,
      types: data.types.map((type: any) => type.type.name),
      height: data.height,
      weight: data.weight,
      abilities: data.abilities.map((ability: any) => ability.ability.name),
    };
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    throw error;
  }
};
