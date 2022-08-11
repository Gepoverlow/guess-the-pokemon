import React, { useState, useEffect } from "react";
import Option from "./Option";

const OptionsDisplay = (props) => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    setNames(props.arrayOfNames);
  }, []);

  const content = (
    <React.Fragment>
      <div className="optionsArray">
        {names &&
          names.map((name) => {
            return <Option pokemonName={name} />;
          })}
      </div>
    </React.Fragment>
  );
  return content;
};

export default OptionsDisplay;
