/**
 * Calculates delay.
 *
 * @param {string} date Date in ISO 8601 standard
 * @return {number} Milliseconds
 */
const calculateDelay = (date) => Date.parse(date) - Date.now();

module.exports = calculateDelay;
