import JsonDataReader from '../readers/JsonDataReader.js';
import CsvDataReader from '../readers/CsvDataReader.js';

/**
 * Factory pattern implementation for creating data readers
 * Encapsulates the creation logic and follows the Open/Closed principle
 */
export default class ReaderFactory {
  /**
   * Creates a data reader based on file extension
   * @param {string} filePath - Path to the file
   * @returns {DataReader} Appropriate reader instance
   * @throws {Error} If file type is not supported
   */
  static createReader(filePath) {
    const extension = filePath.split('.').pop().toLowerCase();

    switch (extension) {
      case 'json':
        return new JsonDataReader();
      case 'csv':
        return new CsvDataReader();
      default:
        throw new Error(`Unsupported file type: ${extension}`);
    }
  }
}
