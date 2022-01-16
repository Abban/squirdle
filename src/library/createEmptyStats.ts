const createEmptyStats = (guesses: number): Array<number> => {
    const stats = [];
    for (let i = 0; i < guesses; i++) {
        stats.push(0);
    }
    return stats;
}

export default createEmptyStats;