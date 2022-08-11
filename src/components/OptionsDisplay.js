import React, { useState, useEffect } from "react";
import Option from "./Option";

const OptionsDisplay = (props) => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    setPokemons(props.arrayOfNames);
  }, []);

  const content = (
    <React.Fragment>
      <div className="options-display">
        {pokemons &&
          pokemons.map((pokemon) => {
            return <Option key={pokemon.id} pokemonName={pokemon.name} pokemonId={pokemon.id} onClick={props.onClick} />;
          })}
      </div>
    </React.Fragment>
  );
  return content;
};

export default OptionsDisplay;
