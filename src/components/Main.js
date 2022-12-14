import React, { useState, useEffect } from "react";
import "../styles/main.css";
import Pokemon from "../classes/Pokemon";
import PokemonDisplay from "./PokemonDisplay";
import OptionsDisplay from "./OptionsDisplay";
import ResultDisplay from "./ResultDisplay";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

const Main = (props) => {
  const [currentPokemon, setCurrentPokemon] = useState({});
  const [round, setRound] = useState(0);
  const [pokemonFrom, setPokemonFrom] = useState(1);
  const [pokemonTo, setPokemonTo] = useState(700);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInconsistencies, setHasInconsistencies] = useState(false);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(898);
  const [hasSelected, setHasSelected] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    fetchRandomPokemon(pokemonFrom, pokemonTo);
  }, [round]);

  async function fetchRandomPokemon(from, to) {
    if (checkForInconsistencies(from, to)) {
      try {
        const randomId = randomIntFromInterval(from, to);
        const pokemon = await fetchPokemonById(randomId);
        const pokemonNames = await fetchRandomPokemonNames(pokemon, from, to);
        const preparedPokemon = preparePokemonObject(pokemon, pokemonNames);
        setCurrentPokemon(preparedPokemon);
        setIsLoading(true);
        if (!preparedPokemon.sprite) {
          setHasInconsistencies(true);
        } else {
          setHasInconsistencies(false);
        }
      } catch (err) {
        console.log(`There has been an error while trying to fetch a Pokemon: ${err}`);
        setHasInconsistencies(true);
      }
    } else {
      setHasInconsistencies(true);
    }
  }

  async function fetchPokemonById(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
    return pokemon;
  }

  async function fetchRandomPokemonNames(pokemon, from, to) {
    const randomPokemonIds = getArrayOfUniqueIds(from, to, pokemon.id);
    const randomPokemonNames = [];

    for (let i = 1; i < randomPokemonIds.length; i++) {
      const pokemon = await fetchPokemonById(randomPokemonIds[i]);
      randomPokemonNames.push({ name: pokemon.name.toUpperCase(), id: pokemon.id });
    }
    randomPokemonNames.push({ name: pokemon.name.toUpperCase(), id: pokemon.id });
    shuffleArray(randomPokemonNames);

    return randomPokemonNames;
  }

  function preparePokemonObject(rawPokemon, namesArray) {
    return new Pokemon(rawPokemon, namesArray);
  }

  function getArrayOfUniqueIds(from, to, currentId) {
    const numbersArray = [];
    numbersArray.push(currentId);

    do {
      const randomNumber = randomIntFromInterval(from, to);
      if (!numbersArray.includes(randomNumber)) {
        numbersArray.push(randomNumber);
      }
    } while (numbersArray.length <= 3);

    return numbersArray;
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handleClick = (value) => {
    handleSelection(value, currentPokemon.id);
  };

  const handleNextRoundButton = () => {
    setIsLoading(false);
    setHasSelected(false);
    handleNextRound();
  };

  const checkForInconsistencies = (from, to) => {
    return from + 5 < to && from > minIndex && to <= maxIndex;
  };

  const handleSelection = (clickedSelectionId, correctPokemonId) => {
    setHasSelected(true);
    if (clickedSelectionId === correctPokemonId) {
      setResultMessage(`Correct! The Pokemon was ${currentPokemon.name}.`);
      props.handleLives && props.handleLives(props.lives);
      props.handleScore && props.handleScore(props.score + 50);
    } else {
      setResultMessage(`Incorrect! The Pokemon was ${currentPokemon.name}.`);
      props.handleLives && props.handleLives(props.lives - 1);
    }
  };

  const handleNextRound = () => {
    const currentRound = round;
    const nextRound = currentRound + 1;
    setRound(nextRound);
  };

  const handleRestart = () => {
    props.handleLives && props.handleLives(3);
    props.handleScore && props.handleScore(0);
    setRound(0);
    setHasSelected(false);
  };

  const content = (
    <main className="main">
      {hasInconsistencies ? (
        <ErrorMessage />
      ) : !isLoading ? (
        <Loading />
      ) : !hasSelected ? (
        <React.Fragment>
          <PokemonDisplay source={currentPokemon.sprite} hasSelected={hasSelected} />
          <OptionsDisplay arrayOfNames={currentPokemon.randomNames} onClick={handleClick} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <PokemonDisplay source={currentPokemon.sprite} hasSelected={hasSelected} />
          <ResultDisplay message={resultMessage} handleNextRound={handleNextRoundButton} handleRestart={handleRestart} lives={props.lives} />
        </React.Fragment>
      )}
    </main>
  );
  return content;
};

export default Main;
