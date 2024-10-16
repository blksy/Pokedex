import { Link } from "react-router-dom";
import Button from "../components/Button";
import style from "./Home.module.css";
import ROUTES from "../routes";
export default function Home() {
  return (
    <div className={style.container}>
      <h1 className={style.header}>Welcome to the wide world of Pokemon!</h1>
      <Link to={ROUTES.pokemonList}>
        <Button>Start Exploring</Button>
      </Link>
    </div>
  );
}
