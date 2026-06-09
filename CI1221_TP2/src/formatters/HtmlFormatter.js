import Formatter from '../core/Formatter.js';

/**
 * Concrete strategy for formatting data as HTML
 */
export default class HtmlFormatter extends Formatter {
  format(cities) {
    let result = `
  <!DOCTYPE HTML>
  <html>
    <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8" />
      <title>Relatório de Nomes de Cidades</title>
    </head>
    <body>
      <h1>Relatório de Nomes de Cidades</h1>
      <ul>
  `;

    for (const city of cities) {
      result += `     <li>${city.nome}</li>\n`;
    }

    result += `
      </ul>
    </body>
  </html>`;

    return result;
  }
}
