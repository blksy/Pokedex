import Button from "./Button";
import style from "./NavBar.module.css";

export default function NavBar() {
  return (
    <div className={style.navbar}>
      <div className={style.container}>
        <div className={style.logo}></div>
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
