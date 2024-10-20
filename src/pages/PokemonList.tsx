import { useEffect, useState } from "react";
import Button from "../components/Button";
import style from "./PokemonList.module.css";
import { fetchPokemon, fetchPokemonDetails } from "../api/PokemonApi";
import PokemonCard from "../components/PokemonCard";
import { useNavigate } from "react-router";
import ROUTES from "../routes";

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadPokemonData = async () => {
    setLoading(true);
    try {
      const pokemonData = await fetchPokemon(offset, 20);

      const detailedPokemonData = await Promise.all(
        pokemonData.map(async (pokemon: any) => {
          const details = await fetchPokemonDetails(pokemon.name);
          return details;
        })
      );

      setPokemonList((prevList) => {
        const existingNames = new Set(prevList.map((pokemon) => pokemon.name));
        const newPokemon = detailedPokemonData.filter(
          (pokemon) => !existingNames.has(pokemon.name)
        );
        return [...prevList, ...newPokemon];
      });

      setOffset((prevOffset) => prevOffset + 20);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemonData();
  }, []);

  const handlePokemonClick = (pokemonName: string) => {
    navigate(ROUTES.pokemonDetails(pokemonName));
  };
  return (
    <>
      <h2 className={style.header}>Below You Can See All Existing Pokémon</h2>
      <div className={style.listContainer}>
        <div className={style.pokemonList}>
          {pokemonList.map((pokemon, index) => (
            <PokemonCard
              key={index}
              name={pokemon.name}
              imageUrl={pokemon.sprite}
              types={pokemon.types}
              onClick={() => handlePokemonClick(pokemon.name)}
            />
          ))}
        </div>
        <Button
          className={style.btn}
          onClick={loadPokemonData}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load more..."}
        </Button>
      </div>
    </>
  );
}
