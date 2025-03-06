"use client"

import { fetchPokemonData } from "@/app/lib/pokemon";
import { useEffect, useState } from "react";
import { PokemonDetails } from "@/app/lib/pokemon";
import PokemonCard from "@/app/ui/Page1/pokemonCard";

export default function Page() {
  const [pokemon, setPokemon] = useState<PokemonDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPokemonData();
        setPokemon(data);
      } catch (err) {
        setError('Failed to load Pokemon data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getPokemon();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

    return (
      <div className="flex flex-col items-center gap-8">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="">
            <div className="flex flex-col gap-4 items-center">
              <h2 className="text-2xl font-bold">Pokedex</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {pokemon.map((poke) => (
                <div key={poke.name}>
                  <PokemonCard key={poke.name} {...poke} />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }
  