export const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (Number(max) - Number(min) + 2));
};
