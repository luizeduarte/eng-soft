import * as fs from 'node:fs';
import DataReader from '../core/DataReader.js';
import City from '../core/City.js';

/**
 * Concrete strategy for reading CSV data files
 * Expects CSV format: COD UF,COD,NOME (with headers)
 */
export default class CsvDataReader extends DataReader {
  read(filePath) {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const lines = rawData.trim().split('\n');

    // Skip header line and parse data
    const cities = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',');
      if (parts.length >= 3) {
        const codUf = parts[0].trim();
        const cod = parts[1].trim();
        const nome = parts[2].trim();

        cities.push(new City(cod, nome, codUf));
      }
    }

    return cities;
  }
}
