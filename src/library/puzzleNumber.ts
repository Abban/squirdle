const getPuzzleNumber = (): Number => {
    const oneDay = 24 * 60 * 60 * 1000;
    const startDate = new Date(2022, 0, 16);
    const today = new Date();

    const diffInMilliseconds = startDate.getTime() - today.getTime();
    return Math.ceil(diffInMilliseconds / oneDay);
}

export default getPuzzleNumber;