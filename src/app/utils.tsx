import axios from 'axios';

export const fetchPokemons = async (limit, page, name, typeFilter, setPokemonsData) => {
  try {
    const response = await axios.get('https://nestjs-pokedex-api.vercel.app/pokemons', {
      params: {
        limit,
        page,
        name,
        typeId: typeFilter,
      },
    });
    setPokemonsData(response.data);
  } catch (error) {
    console.error('Error fetching pokemons data:', error);
  }
};


export const fetchTypes = async (setTypes) => {
  try {
    const response = await axios.get('https://nestjs-pokedex-api.vercel.app/types');
    setTypes(response.data);
  } catch (error) {
    console.error('Error fetching types:', error);
  }
};
