import React from "react";
import SelectedMessage from "./SelectedMessage";

const ResultDisplay = (props) => {
  const content = (
    <React.Fragment>
      <div className="result-display">
        <SelectedMessage message={props.message} />
        {props.lives === 0 ? (
          <div>
            {" "}
            <span> You lost Buddy</span>
            <button onClick={props.handleRestart}>Click to Restart!</button>
          </div>
        ) : (
          <button onClick={props.handleNextRound}>Next Round</button>
        )}
      </div>
    </React.Fragment>
  );
  return content;
};

export default ResultDisplay;
