import style from "./PokemonCard.module.css";
interface PokemonCardProps {
  name: string;
  imageUrl: string;
  types: string[];
  onClick: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  imageUrl,
  types,
  onClick,
}) => {
  return (
    <div className={style.card} onClick={onClick}>
      <img src={imageUrl} alt={name} className={style.sprite} />
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <div className={style.types}>
        {types.map((type) => (
          <span key={type} className={style.type}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
