import ReaderFactory from './src/factories/ReaderFactory.js';
import FormatterFactory from './src/factories/FormatterFactory.js';
import ReportGenerator from './src/services/ReportGenerator.js';

/**
 * CLI application for generating city reports
 * Usage: node index.js <filePath> <format>
 *
 * Examples:
 *   node index.js data/cidades-2.json html      # JSON -> HTML
 *   node index.js data/cidades-2.json txt       # JSON -> TXT
 *   node index.js data/cidades.csv html         # CSV -> HTML
 *   node index.js data/cidades.csv csv          # CSV -> CSV
 *   node index.js data/cidades.csv markdown     # CSV -> Markdown
 */

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('Usage: node index.js <filePath> <format>');
  console.error('');
  console.error('Supported formats: html, txt, csv, markdown');
  console.error('');
  console.error('Examples:');
  console.error('  node index.js data/cidades-2.json html');
  console.error('  node index.js data/cidades-2.json txt');
  console.error('  node index.js data/cidades.csv csv');
  console.error('  node index.js data/cidades.csv markdown');
  process.exit(1);
}

const [filePath, format] = args;

try {
  // Create reader based on file extension (Dependency Injection)
  const reader = ReaderFactory.createReader(filePath);

  // Create formatter based on desired format (Dependency Injection)
  const formatter = FormatterFactory.createFormatter(format);

  // Create report generator with injected dependencies
  const generator = new ReportGenerator(reader, formatter);

  // Generate and output the report
  const report = generator.generate(filePath);
  console.log(report);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
