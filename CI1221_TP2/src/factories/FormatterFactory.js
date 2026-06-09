import HtmlFormatter from '../formatters/HtmlFormatter.js';
import TxtFormatter from '../formatters/TxtFormatter.js';
import CsvFormatter from '../formatters/CsvFormatter.js';
import MarkdownFormatter from '../formatters/MarkdownFormatter.js';

/**
 * Factory pattern implementation for creating formatters
 * Encapsulates the creation logic and follows the Open/Closed principle
 */
export default class FormatterFactory {
  /**
   * Creates a formatter based on format type
   * @param {string} format - Desired output format (html, txt, csv, markdown)
   * @returns {Formatter} Appropriate formatter instance
   * @throws {Error} If format is not supported
   */
  static createFormatter(format) {
    switch (format.toLowerCase()) {
      case 'html':
        return new HtmlFormatter();
      case 'txt':
        return new TxtFormatter();
      case 'csv':
        return new CsvFormatter();
      case 'markdown':
        return new MarkdownFormatter();
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }
}
