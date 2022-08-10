import React, { useState, useEffect, Suspense } from "react";
import PokemonImage from "./PokemonImage";

const PokemonDisplay = (props) => {
  const content = (
    <React.Fragment>
      <div className="pokemon-display">
        <img className="pokemon-display-bg" src={require("../assets/whose-that-pokemon.png")} alt="pokemon-display-bg" />
        <PokemonImage source={props.source} />
      </div>
    </React.Fragment>
  );
  return content;
};

export default PokemonDisplay;
