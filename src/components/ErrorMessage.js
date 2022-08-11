import React, { useState, useEffect } from "react";
import "../styles/header.css";

const ErrorMessage = () => {
  const content = (
    <React.Fragment>
      <span>Oops, something went wrong while trying to fetch a Pokemon</span>
    </React.Fragment>
  );
  return content;
};

export default ErrorMessage;
