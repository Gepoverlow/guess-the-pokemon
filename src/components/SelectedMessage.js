import React, { useState, useEffect } from "react";

import "../styles/header.css";

const SelectedMessage = (props) => {
  const content = (
    <React.Fragment>
      <div className="selected-message">
        <span>{props.message}</span>
      </div>
    </React.Fragment>
  );
  return content;
};

export default SelectedMessage;
