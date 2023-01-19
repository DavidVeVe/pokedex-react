import React, { useEffect, useState } from 'react'
import {fetchPokemon} from '../../pokemons'

import './Pokecard.css'

const Pokecard = (props) => {

  const [pokemon, setPokemon] = useState({})

  
  useEffect(() => {
    fetchPokemon(setPokemon, props.pokemonUrl);
  }, [props.pokemonUrl])


 return (
   <div className="pokemonCard">
     <h2>{pokemon.name}</h2>
     <img src={pokemon.image} alt={pokemon.name} />
     <p className="pokemonType">Type: {pokemon.type}</p>
     <p className="pokemonExp">EXP: {pokemon.experience}</p>
  </div>
  )
}

export default Pokecard