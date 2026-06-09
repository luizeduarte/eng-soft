import Formatter from '../core/Formatter.js';

/**
 * Concrete strategy for formatting data as Markdown
 */
export default class MarkdownFormatter extends Formatter {
  getHeader() {
    return '# Relatório de Nomes de Cidades\n\n';
  }

  formatItem(city) {
    return `- ${city.nome}\n`;
  }
}
