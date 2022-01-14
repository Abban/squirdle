const getUniqueDateIdentifier = (): Number => {
    const date = new Date();
    return parseInt(`${date.getFullYear()}${date.getMonth()}${date.getDay()}`);
}

export default getUniqueDateIdentifier;