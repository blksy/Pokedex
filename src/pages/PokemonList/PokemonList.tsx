import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import style from "./PokemonList.module.css";
import { fetchPokemon, fetchPokemonDetails } from "../../api/PokemonApi";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { useNavigate } from "react-router";
import ROUTES from "../../routes";
import { appendPokemonList, setPokemonList } from "../../store/pokemonSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

export default function PokemonList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { filteredPokemon, pokemonList } = useAppSelector(
    (state) => state.pokemon
  );
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadPokemonData = async (isInitialLoad = false) => {
    setLoading(true);
    try {
      const pokemonData = await fetchPokemon(offset, 20);
      const detailedPokemonData = await Promise.all(
        pokemonData.map(async (pokemon) => {
          const details = await fetchPokemonDetails(pokemon.name);
          return details;
        })
      );

      const uniquePokemonData = detailedPokemonData.filter(
        (pokemon, index, self) =>
          index === self.findIndex((p) => p.name === pokemon.name)
      );

      if (isInitialLoad) {
        dispatch(setPokemonList(uniquePokemonData));
      } else {
        dispatch(appendPokemonList(uniquePokemonData));
      }

      setOffset((prevOffset) => prevOffset + 20);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pokemonList.length === 0) {
      loadPokemonData(true);
    }
  }, []);

  const handlePokemonClick = (pokemonName: string) => {
    if (pokemonName) {
      navigate(ROUTES.pokemonDetails(pokemonName));
    } else {
      console.error("Pokemon name is undefined, cannot navigate to details.");
    }
  };

  return (
    <>
      <h2 className={style.header}>Below You Can See All Existing Pokémon</h2>
      <div className={style.listContainer}>
        <div className={style.pokemonList}>
          {filteredPokemon.map((pokemon, index) => (
            <PokemonCard
              key={index}
              name={pokemon.name}
              imageUrl={pokemon.sprite}
              types={pokemon.types}
              onClick={() => handlePokemonClick(pokemon.name)}
            />
          ))}
        </div>
        <Button onClick={() => loadPokemonData(false)} disabled={loading}>
          {loading ? "Loading..." : "Load more..."}
        </Button>
      </div>
    </>
  );
}
