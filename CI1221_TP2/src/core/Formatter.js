/**
 * Abstract base class for report formatters
 * Implements the Strategy pattern and Template Method pattern
 */
export default class Formatter {
  /**
   * Template Method that defines the skeleton for formatting a report
   * @param {City[]} cities - Array of City objects
   * @returns {string} Formatted report
   */
  format(cities) {
    let result = this.getHeader();
    
    for (const city of cities) {
      result += this.formatItem(city);
    }
    
    result += this.getFooter();
    return result;
  }

  /**
   * Hook for report header (optional, defaults to empty)
   * @returns {string}
   */
  getHeader() {
    return '';
  }

  /**
   * Hook for formatting a single city item
   * @param {City} city - The city object
   * @returns {string}
   */
  formatItem(city) {
    throw new Error('formatItem() must be implemented by subclass');
  }

  /**
   * Hook for report footer (optional, defaults to empty)
   * @returns {string}
   */
  getFooter() {
    return '';
  }
}
