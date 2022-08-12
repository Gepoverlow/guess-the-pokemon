import React, { useState, useEffect } from "react";
import "../styles/header.css";

const Header = (props) => {
  const content = (
    <React.Fragment>
      <header className="header">
        <span>Lives Left: {props.lives}</span>
        <span>Score: {props.score}</span>
      </header>
    </React.Fragment>
  );
  return content;
};

export default Header;
