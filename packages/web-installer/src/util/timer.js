/**
 * freezes/slows down the application
 * @param {number} ms - time in miliseconds to freeze the application
 * @returns {Promise<number>}
 */
export const timer = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
