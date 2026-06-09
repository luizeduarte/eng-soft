/**
 * Service that orchestrates reading data and formatting reports
 * Implements dependency injection and the Single Responsibility principle
 */
export default class ReportGenerator {
  /**
   * Constructor with dependency injection
   * @param {DataReader} reader - Data reader implementation
   * @param {Formatter} formatter - Formatter implementation
   */
  constructor(reader, formatter) {
    this.reader = reader;
    this.formatter = formatter;
  }

  /**
   * Generates a report by reading data and formatting it
   * @param {string} filePath - Path to the data file
   * @returns {string} Formatted report
   */
  generate(filePath) {
    const cities = this.reader.read(filePath);
    return this.formatter.format(cities);
  }
}
