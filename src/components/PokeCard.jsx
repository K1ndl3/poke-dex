import { useEffect, useState } from "react"
import { getFullPokedexNumber, getPokedexNumber,  } from "../utils";

export function PokeCard(props) {

    const {selectedPokemon} = props
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const {name, height, abilities, stats, types, moves, sprites} = data || {};
    useEffect(() => {
        // if loading, exit logic
        if (loading || !localStorage) return;
        // check if selected pokemon is in cache
        // 1. define cache
        let cache = {};
        if (localStorage.getItem('pokedex')) {
            cache = JSON.parse(localStorage.getItem('pokedex'));
        }
        // 2. check if sp is in the cache else fetch from api
        if (selectedPokemon in cache) {
            setData(cache[selectedPokemon]);
            console.log("is cache")
            return
        }

        async function fetchPokemonData() {
            try {
                setLoading(true);
                const baseUrl = "https://pokeapi.co/api/v2/";
                const suffix =  "pokemon/" + getPokedexNumber(selectedPokemon);
                const finalUrl = `${baseUrl}${suffix}`;
                const res = await fetch(finalUrl);
                const pokemonData = await res.json();
                setData(pokemonData);


                console.log("Fetching from:", finalUrl);
                console.log("status code", res.status);
                console.log(pokemonData);


                cache[selectedPokemon] = pokemonData;
                localStorage.setItem('pokedex',JSON.stringify(cache));
            } catch(err) {
                console.log(err.message)
            }finally {
                setLoading(false);
            }
        }

        fetchPokemonData();
        // 3. if fetch from api, save info to cache
    },[selectedPokemon])

    if (loading || !data) {
        return (
            <div>
                <h4>Loading...</h4>
            </div>
        )
    }

    return (<div className="poke-card">
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
        <h2>{name}</h2>
    </div>)
}