import React, { useState, useEffect } from "react";
import Pokemon from "../classes/Pokemon";

const Round = () => {
  const [currentPokemon, setCurrentPokemon] = useState({});
  const [pokemonFrom, setPokemonFrom] = useState(1);
  const [pokemonTo, setPokemonTo] = useState(151);

  useEffect(() => {
    fetchRandomPokemon(pokemonFrom, pokemonTo);
  }, []);

  useEffect(() => {
    console.log(currentPokemon);
  }, [currentPokemon]);

  async function fetchRandomPokemon(from, to) {
    try {
      const random = Math.floor(Math.random() * to) + from;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`);
      const pokemon = await response.json();
      setCurrentPokemon(preparePokemonObject(pokemon));
    } catch (err) {
      console.log(err);
    }
  }

  async function getRandomPokemonNames(name, from, to) {
    for (let i = 0; i < 3; i++) {
      const random = Math.floor(Math.random() * to) + from;
    }
  }

  function preparePokemonObject(pokemonResponse) {
    return new Pokemon(pokemonResponse.name, pokemonResponse.sprites.other.home.front_default);
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
