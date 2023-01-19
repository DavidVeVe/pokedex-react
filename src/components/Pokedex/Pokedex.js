import React, {useEffect, useState, useRef} from 'react'

import Pokecard from '../Pokecard';
import './Pokedex.css';

import {fetchPokemons, fetchExp} from '../../pokemons';


const Pokedex = (props) => {

    const [redExperience, setRedExperience] = useState(0)
    const [blueExperience, setBlueExperience] = useState(0)

    const [experience, setExperience] = useState({
        redTeamUrls: [],
        blueTeamUrls: [],
    });

    const [pokemons, setPokemons] = useState({})

    const [teams, setTeams] = useState(
        {
            blueTeam: [],
            redTeam: [],
        }
    );


    const startFight = async (urls, setExperience) => {
        let expPromise = urls.map(async url => {
            let experience = await fetchExp(url)
            return experience
        })
        //
        let exp = expPromise.reduce(async (total, value) => {
            return await total + await value
        }, 0)

        setExperience(await exp)
    }

    console.log(redExperience)
    console.log(blueExperience)


    const generatePokemons = async () => {
        let blueIdArray = []
        while (blueIdArray.length < 4) {
            const pokemonId = Math.floor(Math.random() * 100)
            blueIdArray.push(pokemonId)
        }

        let redIdArray = []
        while (redIdArray.length < 4) {
            const pokemonId = Math.floor(Math.random() * 100)
            redIdArray.push(pokemonId)
        }


        setTeams({
            blueTeam: blueIdArray.map(pokemonId => {
                return pokemons.pokemonList.filter((p, index) => {
                    return index === pokemonId
                })
            }).flat(),
            redTeam: redIdArray.map(pokemonId => {
                    return pokemons.pokemonList.filter((p, index) => {
                        return index === pokemonId
                    })
                }
            ).flat()
        })

        setExperience({
            blueTeamUrls: blueIdArray.map(pokemonId => {
                return pokemons.pokemonUrls.filter((p, index) => {
                    return index === pokemonId
                })
            }).flat(),
            redTeamUrls: redIdArray.map(pokemonId => {
                return pokemons.pokemonUrls.filter((p, index) => {
                    return index === pokemonId
                })
            }).flat()
        })
    }

    startFight(experience.redTeamUrls, setRedExperience)
    startFight(experience.blueTeamUrls, setBlueExperience)


    useEffect(() => {
        fetchPokemons(setPokemons)
    }, [])


    return (
        <div className="pokedex">
            <div className="redTeam team">
                <div className="team__header">
                    <h1>Red Team</h1>
                    <p>Total experience: {redExperience}</p>
                </div>
                <div className="team__pokemons">
                    {teams.redTeam.flat().map((pokemon, index) => {
                        return <Pokecard key={index} pokemonUrl={pokemon.url}/>
                    })}
                </div>
            </div>
            <button onClick={generatePokemons}>Spawn Pokemons!</button>
            <div className="blueTeam team">
                <div className="team__header">
                    <h1>Blue Team</h1>
                    <p>Total experience: {blueExperience}</p>
                </div>
                <div className="team__pokemons">
                    {teams.blueTeam.map((pokemon, index) => {
                        return <Pokecard key={index} pokemonUrl={pokemon.url}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Pokedex;
