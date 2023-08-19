interface ButtonProps {
  text: string;
  onClick?: () => void;
  classname: string;
}

function Button({ text, onClick, classname }: ButtonProps) {
  if (!onClick) {
    return (
      <button className={classname} onClick={() => null}>
        {text}
      </button>
    );
  }
  return (
    <button onClick={onClick} className={classname}>
      {text}
    </button>
  );
}

export default Button;
