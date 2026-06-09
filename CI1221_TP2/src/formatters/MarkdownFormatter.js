import Formatter from '../core/Formatter.js';

/**
 * Concrete strategy for formatting data as Markdown
 */
export default class MarkdownFormatter extends Formatter {
  format(cities) {
    let result = '# Relatório de Nomes de Cidades\n\n';

    for (const city of cities) {
      result += `- ${city.nome}\n`;
    }

    return result;
  }
}
