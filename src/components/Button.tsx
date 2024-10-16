import style from "./Button.module.css";

const Button = ({ children, onClick, disabled }: any) => {
  return (
    <button className={style.btn} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
