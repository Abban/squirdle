const getPuzzleNumber = (): Number => {
    const oneDay = 24 * 60 * 60 * 1000;
    const startDate = new Date(2022, 0, 17);
    const today = new Date();

    const diffInMilliseconds = today.getTime() - startDate.getTime();
    return Math.floor(diffInMilliseconds / oneDay);
}

export default getPuzzleNumber;