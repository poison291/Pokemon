import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import PokemonDetail from './PokemonDetail';
import './Pokemon.css';

export default function Pokemon() {
    const [pokemon, setpokemon] = useState([]);
    const [loading, setloading] = useState(true);
    const [selectedPokemonUrl, setSelectedPokemonUrl] = useState(null);
    const [page, setpage] = useState(1);

    const limit = 15;
    const offset = (page - 1) * limit
    const API = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(API)
            const PokemonData = response.data.results
            const PokemonDetail = await Promise.all(
                PokemonData.map(async (pokemon) => {
                    const details = await axios.get(pokemon.url)
                    return {
                        name: pokemon.name,
                        image: details.data.sprites.front_default,
                    }
                })
            )



            setpokemon(PokemonDetail)
            setloading(false)
        }

        fetchData()
    }, [page]);

    const prev = () => {
        setpage(page - 1)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    const next = () => {
        setpage(page + 1)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    const handlePokemonClick = (url) => {
        setSelectedPokemonUrl(url);
    };

    return (
        <>
            <div className="pokemon-container">
                <div className="title-container">
                    <img className='pokeball left' src="./pokeball.png" alt="" />
                    <h1 className="title">Your Ultimate Pokemon Hub</h1>
                    <img className='pokeball right' src="./pokeball.png" alt="" />
                </div>
                <div className="pokemon-list">

                    {
                        pokemon.map((pokemon) => (
                            <div key={pokemon.name} className="pokemon-card">
                                <h1 className='name'>{pokemon.name}</h1>
                                <img src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`} alt="" />
                            </div>
                        ))
                    }
                </div>
                {selectedPokemonUrl && <PokemonDetail pokemonUrl={selectedPokemonUrl} />}


                <div className="pagination">
                    <button disabled={page === 1} onClick={prev}>Prev</button>
                    <p>{page}</p>
                    <button onClick={next} >Next</button>
                </div>





            </div>
        </>


    )
}
