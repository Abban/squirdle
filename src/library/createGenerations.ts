import {Generation} from "@/entities/Generation";

const createGenerations = (pokemon: Array<String>, generations: Array<Generation>): Array<Array<String>> => {
    const splitGenerations: Array<Array<String>> = [];
    generations.forEach((generation: Generation) => {
        splitGenerations.push(pokemon.slice(generation.start, generation.end));
    });
    return splitGenerations;
}

export default createGenerations;