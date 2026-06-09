/**
 * Abstract base class for report formatters
 * Implements the Strategy pattern
 */
export default class Formatter {
  /**
   * Formats an array of cities into a report string
   * @param {City[]} cities - Array of City objects
   * @returns {string} Formatted report
   */
  format(cities) {
    throw new Error('format() must be implemented by subclass');
  }
}
