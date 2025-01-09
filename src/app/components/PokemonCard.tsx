"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function PokemonCard({ pokemon }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={200}
          height={200}
          className="rounded-md"
        />
      </div>

      <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">{pokemon.name}</h3>

      <p className="text-center text-gray-600 mb-4">Types: {pokemon.types ? pokemon.types.join(', ') : 'N/A'}</p>

      <div className="text-center">
        <Link
          href={`/pokemons/${pokemon.pokedexId}`}
          className="text-blue-500 hover:underline font-medium"
        >
          Détails
        </Link>
      </div>
    </div>
  );
}
