const { centsToDollars, dollarsToCents, formatCurrency } = require('../../src/utils/currency');

describe('Currency Utils', () => {
  describe('centsToDollars', () => {
    it('should convert cents to dollars', () => {
      expect(centsToDollars(100)).toBe(1.0);
      expect(centsToDollars(7999)).toBe(79.99);
      expect(centsToDollars(0)).toBe(0);
    });
  });

  describe('dollarsToCents', () => {
    it('should convert dollars to cents', () => {
      expect(dollarsToCents(1.0)).toBe(100);
      expect(dollarsToCents(79.99)).toBe(7999);
      expect(dollarsToCents(0)).toBe(0);
    });

    it('should handle decimal precision', () => {
      expect(dollarsToCents(1.99)).toBe(199);
      expect(dollarsToCents(10.5)).toBe(1050);
      expect(dollarsToCents(99.95)).toBe(9995);
    });
  });

  describe('formatCurrency', () => {
    it('should format cents as USD currency', () => {
      expect(formatCurrency(7999)).toBe('$79.99');
      expect(formatCurrency(100)).toBe('$1.00');
      expect(formatCurrency(0)).toBe('$0.00');
    });
  });
});
