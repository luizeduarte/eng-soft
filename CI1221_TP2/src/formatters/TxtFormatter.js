import Formatter from '../core/Formatter.js';

/**
 * Concrete strategy for formatting data as plain text
 */
export default class TxtFormatter extends Formatter {
  getHeader() {
    return `Relatório de Nomes de Cidades
=============================\n`;
  }

  formatItem(city) {
    return `* ${city.nome}\n`;
  }
}
