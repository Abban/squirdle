import {Pokemon, PokemonClient} from 'pokenode-ts';
const api = new PokemonClient();

const getPokemonInfo = async (name: String): Promise<Pokemon> => {
    const searchName = name.replace(' ', '-').replace(/[^\w-]/g, '');
    return api.getPokemonByName(searchName);
}

export default {
    getPokemonInfo
}