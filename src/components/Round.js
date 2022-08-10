import React, { useState, useEffect } from "react";
import Pokemon from "../classes/Pokemon";

const Round = () => {
  const [currentPokemon, setCurrentPokemon] = useState({});
  const [pokemonFrom, setPokemonFrom] = useState(1);
  const [pokemonTo, setPokemonTo] = useState(5);

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
      const pokemonNames = await fetchRandomPokemonNames(pokemon.name, pokemon.id, from, to);
      setCurrentPokemon(preparePokemonObject(pokemon, pokemonNames));
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
    return pokemon;
  }

  async function fetchRandomPokemonNames(name, id, from, to) {
    const randomPokemonIds = getArrayOfUniqueIds(from, to, id);
    const randomPokemonNames = [];

    for (let i = 1; i < randomPokemonIds.length; i++) {
      const pokemon = await fetchPokemon(randomPokemonIds[i]);
      randomPokemonNames.push(pokemon.name);
    }
    randomPokemonNames.push(name);

    return randomPokemonNames;
  }

  function preparePokemonObject(rawPokemon, namesArray) {
    return new Pokemon(rawPokemon.name, rawPokemon.sprites.other.home.front_default, namesArray);
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

  const content = (
    <React.Fragment>
      <div>
        <button>Play Again</button>
      </div>
    </React.Fragment>
  );
  return content;
};

export default Round;
