import "../styles/main.css";

const Option = (props) => {
  function sendId() {
    props.onClick && props.onClick(props.pokemonId);
  }

  const content = (
    <div onClick={sendId} className="option">
      <span>{props.pokemonName}</span>
    </div>
  );
  return content;
};

export default Option;
