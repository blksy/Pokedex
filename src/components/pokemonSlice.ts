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
const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemonList(state, action: PayloadAction<any[]>) {
      state.pokemonList = action.payload;
      state.filteredPokemon = action.payload;
    },
    appendPokemonList(state, action: PayloadAction<any[]>) {
      state.pokemonList = [...state.pokemonList, ...action.payload];
      state.filteredPokemon = [...state.filteredPokemon, ...action.payload];
    },
    setFilters(state, action: PayloadAction<{ name: string; type: string }>) {
      state.filters = action.payload;
      state.filteredPokemon = state.pokemonList.filter((pokemon) => {
        const nameMatch = pokemon.name
          .toLowerCase()
          .includes(state.filters.name.toLowerCase());
        const typeMatch =
          !state.filters.type ||
          pokemon.types.some((t: string) =>
            t.toLowerCase().includes(state.filters.type.toLowerCase())
          );
        return nameMatch && typeMatch;
      });
    },

    clearFilters(state) {
      state.filters = { name: "", type: "" };
      state.filteredPokemon = state.pokemonList;
    },
  },
});

export const { setPokemonList, appendPokemonList, setFilters, clearFilters } =
  pokemonSlice.actions;
export default pokemonSlice.reducer;
