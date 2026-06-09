/**
 * Abstract base class for data readers
 * Implements the Strategy pattern
 */
export default class DataReader {
  /**
   * Reads data from file and returns array of City objects
   * @param {string} filePath - Path to the data file
   * @returns {City[]} Array of City objects
   */
  read(filePath) {
    throw new Error('read() must be implemented by subclass');
  }
}
