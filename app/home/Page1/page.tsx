"use client";

import { fetchPokemonData } from "@/app/lib/pokemon";
import { useEffect, useState, useCallback } from "react";
import { PokemonDetails } from "@/app/lib/pokemon";
import PokemonCard from "@/app/ui/Page1/pokemonCard";
import { debounce, filterPokemonByName, paginatePokemon } from "@/app/lib/utils";

export default function Page() {
  const [pokemon, setPokemon] = useState<PokemonDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonDetails[]>([]);
  const itemsPerPage = 18;

  useEffect(() => {
    const getPokemon = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPokemonData();
        setPokemon(data);
        setFilteredPokemon(data);
      } catch (err) {
        setError("Failed to load Pokemon data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getPokemon();
  }, []);

  const handleSearch = useCallback(
    debounce((query: string) => {
      setCurrentPage(1);
      setFilteredPokemon(filterPokemonByName(pokemon, query));
    }, 300),
    [pokemon]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  const paginatedPokemon = paginatePokemon(filteredPokemon, currentPage, itemsPerPage);
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

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
      <main className="flex flex-col gap-6 row-start-2 items-center sm:items-start">
        <h2 className="text-2xl font-bold mb-0">Pokedex</h2>
        <div className="w-full max-w-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search Pokémon..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {paginatedPokemon.map((poke) => (
            <PokemonCard key={poke.name} {...poke} />
          ))}
        </div>
        <div className="flex gap-4 mt-4 w-full justify-center">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}