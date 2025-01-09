"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import Pagination from "../components/Pagination";

export default function Pokemons() {
  const [pokemonsData, setPokemonsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [typeFilter, setTypeFilter] = useState(null);
  const [types, setTypes] = useState([]);

 
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get("https://nestjs-pokedex-api.vercel.app/types");
        setTypes(response.data);
      } catch (error) {
        console.error("Error fetching types", error);
      }
    };

    fetchTypes();
  }, []);


  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);

      try {
        const response = await axios.get("https://nestjs-pokedex-api.vercel.app/pokemons", {
          params: {
            limit,
            page,
            name,
            typeId: typeFilter,
          },
        });
        setPokemonsData(response.data);
      } catch (error) {
        console.error("Error fetching pokemons data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [limit, page, name, typeFilter]);

  return (
    <div className="min-h-screen bg-gray-100">

      <nav className="bg-red-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pokédex</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Rechercher un Pokémon"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded-md text-black placeholder-gray-500"
            />

            <select
              onChange={(e) => setTypeFilter(e.target.value || null)}
              className="p-2 rounded-md bg-white text-black"
            >
              <option value="">Tous les types</option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <select 
               onChange={(e) => setLimit(Number(e.target.value))} value={limit}
               className="p-2 rounded-md bg-white text-black">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
          </select>

          </div>
        </div>
      </nav>

    
      <div className="container mx-auto p-6">
        {loading ? (
          <p className="text-center text-gray-500">Chargement...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pokemonsData.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}

      
        <div className="mt-8">
          <Pagination
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
            totalItems={pokemonsData.length}
            itemsPerPage={limit}
          />
        </div>
      </div>
    </div>
  );
}
