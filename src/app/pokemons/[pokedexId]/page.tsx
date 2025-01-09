"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from 'next/image';

export default function PokemonDetail({ params }: { params: { pokedexId: string } }) {
  const router = useRouter();
  const { pokedexId } = params;

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pokedexId) return;

    const fetchPokemonDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://nestjs-pokedex-api.vercel.app/pokemons/${pokedexId}`);
        setPokemon(response.data);
      } catch (error) {
        console.error("Error fetching pokemon details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [pokedexId]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!pokemon) {
    return <p>Pokémon non trouvé</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-red-600 mb-4">{pokemon.name}</h1>
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        width={500}
        height={500}
        className="rounded-md"
       />
      <h2 className="text-2xl font-semibold">Stats</h2>
      <ul className="list-disc ml-6">
        <li>HP: {pokemon.stats.hp}</li>
        <li>Attack: {pokemon.stats.attack}</li>
        <li>Defense: {pokemon.stats.defense}</li>
       
      </ul>

      <h2 className="text-2xl font-semibold mt-6">Évolutions</h2>
      <ul className="list-disc ml-6">
        {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
          pokemon.evolutions.map((evolution, idx) => (
            <li key={idx}>{evolution.name}</li>
          ))
        ) : (
          <li>Aucune évolution</li>
        )}
      </ul>

      <button
        onClick={() => router.push("/pokemons")}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Retour
      </button>
    </div>
  );
}
