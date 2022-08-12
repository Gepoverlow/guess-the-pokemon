import React, { useState, useEffect, Suspense } from "react";
import HiddenPokemonImage from "./HiddenPokemonImage";
import ShownPokemonImage from "./ShownPokemonImage";

const PokemonDisplay = (props) => {
  const content = (
    <React.Fragment>
      <div className="pokemon-display">
        <img className="pokemon-display-bg" src={require("../assets/whose-that-pokemon.png")} alt="pokemon-display-bg" />
        {!props.hasSelected ? <HiddenPokemonImage source={props.source} /> : <ShownPokemonImage source={props.source} />}
      </div>
    </React.Fragment>
  );
  return content;
};

export default PokemonDisplay;
