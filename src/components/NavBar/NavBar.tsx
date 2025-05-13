import { Link } from "react-router-dom";
import Button from "../Button/Button";
import style from "./NavBar.module.css";
import ROUTES from "../../routes";
import { useAppDispatch } from "../../store/store";
import { useState } from "react";
import { setFilters } from "../../store/pokemonSlice";

export default function NavBar() {
  const dispatch = useAppDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setFilters({ name: searchName, type: searchType }));
  };

  return (
    <div className={style.navbar}>
      <div className={style.container}>
        <div className={style.logo} />
        <Link to={ROUTES.home}>
          <Button className={style.btn}>Home</Button>
        </Link>
        <form className={style.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
    </div>
  );
}
