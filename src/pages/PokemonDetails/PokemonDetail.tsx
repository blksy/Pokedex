import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails } from "../../api/PokemonApi";
import style from "./PokemonDetails.module.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import ROUTES from "../../routes";

export default function PokemonDetail() {
  const { pokemonName } = useParams<{ pokemonName: string }>();

  const {
    data: pokemonDetails,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["pokemon", pokemonName],
    queryFn: () => fetchPokemonDetails(pokemonName!),
    enabled: !!pokemonName,
  });

  if (isLoading) {
    return <div className={style.loading}>Loading Pokémon details...</div>;
  }

  if (error) {
    return <div className={style.error}>Failed to load Pokémon details.</div>;
  }

  return pokemonDetails ? (
    <div className={style.container}>
      <h2 className={style.name}>
        {pokemonDetails.name.charAt(0).toUpperCase() +
          pokemonDetails.name.slice(1)}
      </h2>
      <img
        className={style.image}
        src={pokemonDetails.sprite}
        alt={pokemonDetails.name}
      />
      <div className={style.details}>
        <p>
          <strong>Types:</strong> {pokemonDetails.types.join(", ")}
        </p>
        <p>
          <strong>Height:</strong> {pokemonDetails.height} decimetres
        </p>
        <p>
          <strong>Weight:</strong> {pokemonDetails.weight} hectograms
        </p>
        <p>
          <strong>Abilities:</strong> {pokemonDetails.abilities.join(", ")}
        </p>
      </div>
      <Link to={ROUTES.pokemonList}>
        <Button className={style.btn}>Go Back to the Pokedex</Button>
      </Link>
    </div>
  ) : (
    <div>No details available for this Pokémon.</div>
  );
}
