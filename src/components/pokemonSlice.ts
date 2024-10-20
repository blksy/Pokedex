import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokemonState {
  pokemonList: any[];
  filteredPokemon: any[];
  filters: {
    name: string;
    type: string;
  };
}

const initialState: PokemonState = {
  pokemonList: [],
  filteredPokemon: [],
  filters: {
    name: "",
    type: "",
  },
};
