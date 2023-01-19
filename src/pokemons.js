export const fetchPokemons = async (setPokemons) => {
 try {
  const fetchedPokemons = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
  const pokemons = await fetchedPokemons.json()
  const test = pokemons.results.map(pokemon => {
    return pokemon.url
  })
   
   setPokemons({
     pokemonList: await pokemons.results, pokemonUrls: test
   })
 } catch (error) {
  console.log(error)
  return error
  }
}

export const fetchPokemon = async (setPokemon, pokemonUrl) => {
 try {
   const fetchedPokemon = await fetch(pokemonUrl)
  const pokemonData = await fetchedPokemon.json()
  setPokemon({
   name: await pokemonData.name,
   type: await pokemonData.types[0].type.name,
   image: await pokemonData.sprites.front_default,
   experience: await pokemonData.base_experience
  })
 }
 catch (error) {
   console.log(error)
   return error
 }
}

export const fetchExp = async (url) => {
  try {
    const fetchedExp = await fetch(url)
    const exp = await fetchedExp.json()
    return await  exp.base_experience
  }
  catch (error) {
    console.log(error)
    return error
  }
}