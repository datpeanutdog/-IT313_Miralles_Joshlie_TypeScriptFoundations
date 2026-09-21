export const computeAverage = (prelim, midterm, final) => {
    const average = (prelim + midterm + final) / 3;
    return Number(average.toFixed(2));
}

const isPassing = (average) => {
    return average >= 75;
};

export default isPassing;
