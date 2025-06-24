import { useEffect, useState } from "react"
import { getFullPokedexNumber, getPokedexNumber,  } from "../utils";
import { TypeCard } from "./TypeCard";


export function PokeCard(props) {

    const {selectedPokemon} = props
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const {name, height, abilities, stats, types, moves, sprites} = data || {};

    const imgList = Object.keys(sprites || {}).filter(val => {
        if (!sprites[val]) return false;

        if (['version','other'].includes(val)) return false;

        return true;
    })
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

    return (
    <div className="poke-card">
        <div>
            <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
            <h2>{name}</h2>
        </div>
        <div className="type-container">
            {types.map((typeObj, typeIndex) => {
                return (<TypeCard key={typeIndex} type={typeObj?.type?.name}></TypeCard>)
            })}
        </div>
        <img src={'/pokemon/' + getFullPokedexNumber(selectedPokemon) + '.png'} alt={`Image of: ${name}`} className="default-img" />
        <div className="image-container">
            {imgList.map((sprite, spriteKey) => {
                const imgUrl = sprites[sprite]
                return (
                    <img key={spriteKey} src={imgUrl} alt={`${name}-img-${sprite}`}></img>
                )
            })}
        </div>
        <h3>Stats</h3>
        <div className="stats-card">
            {stats.map((statObj, statIndex) => {
                const { stat, base_stat } = statObj;
                return (
                    <div key={statIndex} className="stat-item">
                        <p>{stat?.name}</p>
                        <h4>{base_stat}</h4>
                    </div>
                )
            })}
        </div>
        <h3>Moves</h3>
        <div className="move-card">
            {moves.map((moveObj, moveIndex) => {
                const { move } = moveObj;
                return (
                    <div className="move-name" key={moveIndex}>
                        <p>{move?.name}</p>
                        <p>{move?.url}</p>
                    </div>
                )
            })}
        </div>
    </div>
    )
}