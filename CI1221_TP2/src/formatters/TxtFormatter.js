import Formatter from '../core/Formatter.js';

/**
 * Concrete strategy for formatting data as plain text
 */
export default class TxtFormatter extends Formatter {
  format(cities) {
    let result = `Relatório de Nomes de Cidades
=============================\n`;

    for (const city of cities) {
      result += `* ${city.nome}\n`;
    }

    return result;
  }
}
