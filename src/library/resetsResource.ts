const ITEM_NAME = 'resets';

export interface ResetsResource {
    getResets(): Array<Number>;
    addReset(resets: Array<Number>, day: Number): void;
}

const getResets = (): Array<Number> => {
    let days = loadResets();

    if(!days) {
        days = [];
        storeResets(days);
    }

    return days;
}

const loadResets = (): Array<Number>|null => {
    const resetsString = localStorage.getItem(ITEM_NAME);
    if(resetsString === null) return null;
    return JSON.parse(resetsString);
}

const storeResets = (resets: Array<Number>): void => {
    localStorage.setItem(ITEM_NAME, JSON.stringify(resets));
}

const addReset = (resets: Array<Number>, day: Number): void => {
    if(resets.indexOf(day) === -1) {
        resets.push(day);
        storeResets(resets);
    }
}

export default {
    getResets,
    addReset
} as ResetsResource;