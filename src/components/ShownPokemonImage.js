import React, { useState, useEffect } from "react";

const ShownPokemonImage = (props) => {
  const content = (
    <React.Fragment>
      <img className="pokemon-image" src={props.source} />
    </React.Fragment>
  );
  return content;
};

export default ShownPokemonImage;
