const ITEM_NAME = 'caught';

const getCaught = (): Array<String> => {
    let caught = loadCaught();

    if(!caught) {
        caught = [];
        storeCaught(caught);
    }

    return caught;
}

const loadCaught = (): Array<String>|null => {
    const caughtString = localStorage.getItem(ITEM_NAME);
    if(caughtString === null) return null;
    return JSON.parse(caughtString);
}

const storeCaught = (caught: Array<String>): void => {
    localStorage.setItem(ITEM_NAME, JSON.stringify(caught));
}

const addCaught = (caught: Array<String>, word: String): void => {
    if(caught.indexOf(word) === -1) {
        caught.push(word);
        storeCaught(caught);
    }
}

export default {
    getCaught,
    addCaught
}