import React, { useState, useEffect } from "react";
import SelectedMessage from "./SelectedMessage";

const ResultDisplay = (props) => {
  const content = (
    <React.Fragment>
      <div className="result-display">
        <SelectedMessage message={props.message} />
        <button onClick={props.handleNextRound}>Next Round</button>
      </div>
    </React.Fragment>
  );
  return content;
};

export default ResultDisplay;
