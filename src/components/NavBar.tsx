import { Link } from "react-router-dom";
import Button from "./Button";
import style from "./NavBar.module.css";
import ROUTES from "../routes";

export default function NavBar() {
  return (
    <div className={style.navbar}>
      <div className={style.container}>
        <div className={style.logo} />
        <Link to={ROUTES.home}>
          <Button>Home</Button>
        </Link>
        <form className={style.searchForm}>
          <input
            type="text"
            placeholder="Search pokemon by name or type"
          ></input>
          <Button>Search</Button>
        </form>
      </div>
    </div>
  );
}
