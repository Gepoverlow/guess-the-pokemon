import React, { useState, useEffect } from "react";
import "../styles/main.css";

const Option = (props) => {
  const [pokemonId, setPokemonId] = useState(null);

  useEffect(() => {
    setPokemonId(props.pokemonId);
  }, []);

  function logId() {
    props.onClick && props.onClick(pokemonId);
  }

  const content = (
    <div onClick={logId} className="option">
      <span>{props.pokemonName}</span>
    </div>
  );
  return content;
};

export default Option;
