export const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };
  
  export const filterPokemonByName = (pokemonList: any[], query: string) => {
    if (!query.trim()) return pokemonList;
    const lowerCaseQuery = query.toLowerCase();
    return pokemonList.filter((poke) => poke.name.toLowerCase().includes(lowerCaseQuery));
  };
  
  export const paginatePokemon = (pokemonList: any[], currentPage: number, itemsPerPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    return pokemonList.slice(startIndex, endIndex);
  };