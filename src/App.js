import React, { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const handleLives = (value) => {
    setLives(value);
  };

  return (
    <div className="App">
      <Header lives={lives} />
      <Main onAnswerGiven={handleLives} score={score} lives={lives} />
      <Footer />
    </div>
  );
}

export default App;
