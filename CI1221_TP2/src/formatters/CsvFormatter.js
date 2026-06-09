import Formatter from '../core/Formatter.js';

/**
 * Concrete strategy for formatting data as CSV
 */
export default class CsvFormatter extends Formatter {
  getHeader() {
    return 'ID,Nome,Estado\n';
  }

  formatItem(city) {
    return `${city.id},${city.nome},${city.estado}\n`;
  }
}
