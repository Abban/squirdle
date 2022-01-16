import sample from '@stdlib/random/sample';
import pokemon from '@/data/pokemon.json';

const getWord = (date: Number, seed: Number): string => {
    const wordArray = sample.factory({
        'seed': parseInt(`${date}${seed}`),
        'size': 1
    });

    return wordArray(pokemon)[0].toLowerCase();
}

const wordExists = (word: string): Boolean => {
    return pokemon.indexOf(word) !== -1;
}

export default {
    getWord,
    wordExists
};