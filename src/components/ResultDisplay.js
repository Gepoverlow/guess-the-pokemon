import React from "react";
import SelectedMessage from "./SelectedMessage";

const ResultDisplay = (props) => {
  const content = (
    <React.Fragment>
      <div className="result-display">
        <SelectedMessage message={props.message} />
        {props.lives === 0 ? (
          <div>
            <span id="lost-msg"> You Lost :/ </span>
            <span id="nextRound" onClick={props.handleRestart}>
              Click to Restart!
            </span>
          </div>
        ) : (
          <span id="restart" onClick={props.handleNextRound}>
            Click for next Round
          </span>
        )}
      </div>
    </React.Fragment>
  );
  return content;
};

export default ResultDisplay;
