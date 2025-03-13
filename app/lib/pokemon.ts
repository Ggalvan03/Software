export interface Pokemon {
    name: string;
    url: string;
}
  

export interface PokemonDetails {
    name: string;
    sprite: string | null;
}

export const fetchPokemonData = async (): Promise<PokemonDetails[]> => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      if (!res.ok) throw new Error("Failed to fetch Pokémon list.");
  
      const data: { results: Pokemon[] } = await res.json();
  
      const pokemonDetails: PokemonDetails[] = await Promise.all(
        data.results.map(async (poke: Pokemon): Promise<PokemonDetails> => {
          try {
            const res = await fetch(poke.url);
            if (!res.ok) throw new Error(`Failed to fetch details for ${poke.name}`);
            const details = await res.json();
            return {
              name: poke.name,
              sprite: details.sprites.front_default ?? null, // Handle missing sprites
            };
          } catch (error) {
            console.error(error);
            return { name: poke.name, sprite: null };
          }
        })
      );
  
      return pokemonDetails;
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      return [];
    }
};