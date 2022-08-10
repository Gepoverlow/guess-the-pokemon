import React, { useState, useEffect } from "react";

const PokemonImage = (props) => {
  const content = (
    <React.Fragment>
      <img className="pokemon-image blackout" src={props.source} />
    </React.Fragment>
  );
  return content;
};

export default PokemonImage;
