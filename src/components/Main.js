import React, { useState, useEffect } from "react";
import "../styles/main.css";
import Pokemon from "../classes/Pokemon";
import PokemonDisplay from "./PokemonDisplay";
import OptionsDisplay from "./OptionsDisplay";

const Main = () => {
  const [currentPokemon, setCurrentPokemon] = useState({});
  const [pokemonFrom, setPokemonFrom] = useState(1);
  const [pokemonTo, setPokemonTo] = useState(151);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRandomPokemon(pokemonFrom, pokemonTo);
  }, []);

  useEffect(() => {
    console.log(currentPokemon);
  }, [currentPokemon]);

  async function fetchRandomPokemon(from, to) {
    try {
      const randomId = Math.floor(Math.random() * to) + from;
      const pokemon = await fetchPokemon(randomId);
      const pokemonNames = await fetchRandomPokemonNames(pokemon, from, to);
      setCurrentPokemon(preparePokemonObject(pokemon, pokemonNames));
      setIsLoading(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
    return pokemon;
  }

  async function fetchRandomPokemonNames(pokemon, from, to) {
    const randomPokemonIds = getArrayOfUniqueIds(from, to, pokemon.id);
    const randomPokemonNames = [];

    for (let i = 1; i < randomPokemonIds.length; i++) {
      const pokemon = await fetchPokemon(randomPokemonIds[i]);
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
      const randomNumber = Math.floor(Math.random() * to) + from;

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

  const content = (
    <main className="main">
      {!isLoading ? (
        <span>Loading Data</span>
      ) : (
        <React.Fragment>
          <PokemonDisplay source={currentPokemon.sprite} />
          <OptionsDisplay arrayOfNames={currentPokemon.randomNames} />
        </React.Fragment>
      )}
    </main>
  );
  return content;
};

export default Main;
