import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2/";

interface PokemonListResult {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: PokemonListResult[];
  count: number;
  next: string | null;
  previous: string | null;
}

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
}

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonSprites {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
}

interface PokemonDetailsResponse {
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
}

export const fetchPokemon = async (offset: number, limit: number) => {
  const { data } = await axios.get<PokemonListResponse>(
    `${API_BASE_URL}pokemon?offset=${offset}&limit=${limit}`
  );
  return data.results;
};
export const fetchPokemonDetails = async (pokemonName: string) => {
  try {
    const { data } = await axios.get<PokemonDetailsResponse>(
      `${API_BASE_URL}pokemon/${pokemonName}`
    );
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
