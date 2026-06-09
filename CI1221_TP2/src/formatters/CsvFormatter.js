import Formatter from '../core/Formatter.js';

/**
 * Concrete strategy for formatting data as CSV
 */
export default class CsvFormatter extends Formatter {
  format(cities) {
    let result = 'ID,Nome,Estado\n';

    for (const city of cities) {
      result += `${city.id},${city.nome},${city.estado}\n`;
    }

    return result;
  }
}
