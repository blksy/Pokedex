import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchPokemonDetails } from "../../api/PokemonApi";
import style from "./PokemonDetails.module.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import ROUTES from "../../routes";

export default function PokemonDetail() {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const [pokemonDetails, setPokemonDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemonDetails = async () => {
      setLoading(true);
      setError(null);

      if (!pokemonName) {
        setError("Pokémon name is undefined.");
        setLoading(false);
        return;
      }

      try {
        const details = await fetchPokemonDetails(pokemonName);
        setPokemonDetails(details);
      } catch (err) {
        setError("Failed to load Pokémon details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPokemonDetails();
  }, [pokemonName]);

  if (loading) {
    return <div className={style.loading}>Loading Pokémon details...</div>;
  }

  if (error) {
    return <div className={style.error}>{error}</div>;
  }

  return pokemonDetails ? (
    <>
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
    </>
  ) : (
    <div>No details available for this Pokémon.</div>
  );
}
