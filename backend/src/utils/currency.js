/**
 * Convert cents to dollars
 * @param {number} cents
 * @returns {number}
 */
function centsToDollars(cents) {
  return cents / 100;
}

/**
 * Convert dollars to cents
 * @param {number} dollars
 * @returns {number}
 */
function dollarsToCents(dollars) {
  return Math.round(dollars * 100);
}

/**
 * Format cents as currency string
 * @param {number} cents
 * @returns {string}
 */
function formatCurrency(cents) {
  const dollars = centsToDollars(cents);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(dollars);
}

module.exports = {
  centsToDollars,
  dollarsToCents,
  formatCurrency,
};
