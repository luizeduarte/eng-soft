import * as fs from 'node:fs';
import DataReader from '../core/DataReader.js';
import City from '../core/City.js';

/**
 * Concrete strategy for reading JSON data files
 * Expects JSON format: [{ID, Nome, Estado}, ...]
 */
export default class JsonDataReader extends DataReader {
  read(filePath) {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);

    return data.map(item =>
      new City(item.ID, item.Nome, item.Estado)
    );
  }
}
