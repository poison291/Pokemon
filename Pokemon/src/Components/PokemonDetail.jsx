import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PokemonDetail({ pokemonUrl }) {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDetails = async (url) => {
        const response = await axios.get(url);
        return {
            name: response.data.name,
            image: response.data.sprites.front_default,
            abilities: response.data.abilities.map(ability => ability.ability.name),
            stats: response.data.stats.map(stat => ({
                name: stat.stat.name,
                value: stat.base_stat,
            })),
            types: response.data.types.map(type => type.type.name),
        };
    };

    useEffect(() => {
        const getPokemonDetails = async () => {
            if (pokemonUrl) {
                const details = await fetchDetails(pokemonUrl);
                setPokemon(details);
                setLoading(false);
            }
        };

        getPokemonDetails();
    }, [pokemonUrl]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching Pokémon details.</p>;

    return (
        <div className="pokemon-detail">
            <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
            <h2>Abilities</h2>
            <ul>
                {pokemon.abilities.map((ability, index) => (
                    <li key={index}>{ability}</li>
                ))}
            </ul>
            <h2>Stats</h2>
            <ul>
                {pokemon.stats.map((stat, index) => (
                    <li key={index}>{`${stat.name}: ${stat.value}`}</li>
                ))}
            </ul>
            <h2>Types</h2>
            <p>{pokemon.types.join(', ')}</p>
        </div>
    );
}
