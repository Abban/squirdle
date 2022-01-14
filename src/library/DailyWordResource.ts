import sample from '@stdlib/random/sample';
import pokemon from '@/data/pokemon.json';

const getWord = (date: Number, seed: Number): string => {
    const wordArray = sample.factory({
        'seed': parseInt(`${date}${seed}`),
        'size': 1
    });

    return wordArray(pokemon)[0].toLowerCase();
}

export default getWord;