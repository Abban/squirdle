import sample from '@stdlib/random/sample';
import pokemonData from '@/data/pokemon.json';
import {Generation} from "@/entities/Generation";

const getWord = (date: Number, seed: Number): string => {
    const wordArray = sample.factory({
        'seed': parseInt(`${date}${seed}`),
        'size': 1
    });

    return wordArray(pokemonData.pokemon)[0].toLowerCase();
}

const wordExists = (word: string): Boolean => {
    return pokemonData.pokemon.indexOf(word) !== -1;
}

const getWords = (): Array<string> => {
    return pokemonData.pokemon;
}

const getGenerations = (): Array<Generation> => {
    return pokemonData.generations;
}

export default {
    getWord,
    getWords,
    getGenerations,
    wordExists
};