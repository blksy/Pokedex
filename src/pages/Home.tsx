import Button from "../components/Button";
import style from "./Home.module.css";
export default function Home() {
  return (
    <div className={style.container}>
      <h1>Welcome to the wide world of Pokemon!</h1>
      <Button>Start Exploring</Button>
    </div>
  );
}
