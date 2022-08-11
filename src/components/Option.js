import React, { useState, useEffect } from "react";
import "../styles/main.css";

const Option = (props) => {
  const content = (
    <div>
      <span>{props.pokemonName}</span>
    </div>
  );
  return content;
};

export default Option;
