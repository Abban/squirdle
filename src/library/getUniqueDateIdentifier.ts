const getUniqueDateIdentifier = (): Number => {
    const date: Date = new Date();
    return parseInt(`${date.getFullYear()}${date.getMonth()}${date.getDate()}`);
}

export default getUniqueDateIdentifier;