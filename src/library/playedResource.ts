const ITEM_NAME = 'played';

const hasPlayed = (): Boolean => {
    return loadPlayed();
}

const setPlayed = (): void => {
    localStorage.setItem(ITEM_NAME, JSON.stringify(true));
}

const loadPlayed = (): Boolean => {
    const playedString = localStorage.getItem(ITEM_NAME);
    if(playedString === null) return false;
    return JSON.parse(playedString);
}

export default {
    hasPlayed,
    setPlayed
}