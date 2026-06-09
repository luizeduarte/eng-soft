import Formatter from '../core/Formatter.js';

/**
 * Concrete strategy for formatting data as HTML
 */
export default class HtmlFormatter extends Formatter {
  getHeader() {
    return `
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
  }

  formatItem(city) {
    return `     <li>${city.nome}</li>\n`;
  }

  getFooter() {
    return `
      </ul>
    </body>
  </html>`;
  }
}
