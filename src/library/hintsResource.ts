import {Pokemon, PokemonClient} from 'pokenode-ts';
const api = new PokemonClient();

const getPokemonInfo = async (id: number): Promise<Pokemon> => {
    return api.getPokemonById(id);
}

export default {
    getPokemonInfo
}