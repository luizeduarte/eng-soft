import ReaderFactory from './src/factories/ReaderFactory.js';
import FormatterFactory from './src/factories/FormatterFactory.js';
import ReportGenerator from './src/services/ReportGenerator.js';

/**
 * CLI application for generating city reports
 * Usage: node index.js --format=<format> --source=<filePath>
 *
 * Examples:
 *   node index.js --format=html --source=data/cidades-2.json      # JSON -> HTML
 *   node index.js --format=txt --source=data/cidades-2.json       # JSON -> TXT
 *   node index.js --format=html --source=data/cidades.csv         # CSV -> HTML
 *   node index.js --format=csv --source=data/cidades.csv          # CSV -> CSV
 *   node index.js --format=markdown --source=data/cidades.csv     # CSV -> Markdown
 */

// Parse command line arguments
const args = process.argv.slice(2);

let format = null;
let source = null;

for (const arg of args) {
  if (arg.startsWith('--format=')) {
    format = arg.split('=')[1];
  } else if (arg.startsWith('--source=')) {
    source = arg.split('=')[1];
  }
}

if (!format || !source) {
  console.error('Usage: node index.js --format=<format> --source=<filePath>');
  console.error('');
  console.error('Supported formats: html, txt, csv, markdown');
  console.error('');
  console.error('Examples:');
  console.error('  node index.js --format=html --source=data/cidades-2.json');
  console.error('  node index.js --format=txt --source=data/cidades-2.json');
  console.error('  node index.js --format=csv --source=data/cidades.csv');
  console.error('  node index.js --format=markdown --source=data/cidades.csv');
  process.exit(1);
}

const filePath = source;

try {
  const reader = ReaderFactory.createReader(filePath);
  const formatter = FormatterFactory.createFormatter(format);
  const generator = new ReportGenerator(reader, formatter);
  const report = generator.generate(filePath);
  console.log(report);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
