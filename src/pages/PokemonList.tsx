import { useEffect, useState } from "react";
import Button from "../components/Button";
import style from "./PokemonList.module.css";
import { fetchPokemon } from "../api/PokemonApi";

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadPokemonData = async () => {
    setLoading(true);
    try {
      const pokemonData = await fetchPokemon(20, offset);
      setPokemonList((prevList) => [...prevList, ...pokemonData]);
      setOffset((prevOffset) => prevOffset + 20);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  useEffect(() => {
    loadPokemonData();
  }, []);

  return (
    <>
      <h2 className={style.header}>Below You Can See All Existing Pokémon</h2>
      <div className={style.listContainer}>
        <div className={style.pokemonList}>
          {pokemonList.map((pokemon, index) => (
            <div key={index}>
              <p>{pokemon.name}</p>
            </div>
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
