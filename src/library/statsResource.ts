import {Stats} from "@/entities/Stats";
import createEmptyStats from "@/library/createEmptyStats";

const ITEM_NAME = 'stats';

const getStats = (guesses: number): Stats => {
    let stats = loadStats();

    if(!stats) {
        stats = {
            played: 0,
            won: 0,
            guesses: createEmptyStats(guesses)
        };
        storeStats(stats);
    }

    return stats;
}

const loadStats = (): Stats|null => {
    const statsString = localStorage.getItem(ITEM_NAME);
    if(statsString === null) return null;
    return JSON.parse(statsString);
}

const storeStats = (stats: Stats): void => {
    localStorage.setItem(ITEM_NAME, JSON.stringify(stats));
}

export default {
    getStats,
    storeStats
}