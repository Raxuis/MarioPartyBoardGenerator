import {gameColors} from "../constants";

export const getRandomGameColor = (prevColor) => {
    const colors = Object.values(gameColors);
    let newColor;

    do {
        newColor = colors[Math.floor(Math.random() * colors.length)];
    } while (newColor === prevColor);

    return newColor;
};