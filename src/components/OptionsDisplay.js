import React, { useState, useEffect } from "react";
import Option from "./Option";
import SelectedMessage from "./SelectedMessage";

const OptionsDisplay = (props) => {
  const content = (
    <React.Fragment>
      <div className="options-display">
        {props.hasSelected ? (
          <SelectedMessage message={props.resultMessage} />
        ) : (
          props.arrayOfNames &&
          props.arrayOfNames.map((pokemon) => {
            return <Option key={pokemon.id} pokemonName={pokemon.name} pokemonId={pokemon.id} onClick={props.onClick} />;
          })
        )}{" "}
      </div>
    </React.Fragment>
  );
  return content;
};

export default OptionsDisplay;
