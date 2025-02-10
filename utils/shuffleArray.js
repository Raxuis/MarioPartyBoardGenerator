/**
 * @param {array} array
 * @returns {array}
 * @description Shuffle the given array.
 */
export const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
};


