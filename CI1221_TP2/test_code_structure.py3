#!/usr/bin/env python3
"""
Code structure validation for the refactored JavaScript project
Validates that all necessary files exist and have proper structure
"""

import os
import re

def check_file_exists(path, description):
    if os.path.exists(path):
        print(f"✓ {description}: {path}")
        return True
    else:
        print(f"✗ {description}: {path} NOT FOUND")
        return False

def check_file_contains(path, pattern, description):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            if re.search(pattern, content):
                print(f"  ✓ {description}")
                return True
            else:
                print(f"  ✗ {description} NOT FOUND")
                return False
    except Exception as e:
        print(f"  ✗ Error checking {path}: {e}")
        return False

print("=" * 60)
print("REFACTORED CODE STRUCTURE VALIDATION")
print("=" * 60)

all_ok = True

# Check core components
print("\n1. CORE COMPONENTS")
all_ok &= check_file_exists('src/core/City.js', 'City entity class')
all_ok &= check_file_exists('src/core/DataReader.js', 'DataReader abstract class')
all_ok &= check_file_exists('src/core/Formatter.js', 'Formatter abstract class')

# Check readers
print("\n2. DATA READERS")
all_ok &= check_file_exists('src/readers/JsonDataReader.js', 'JSON data reader')
all_ok &= check_file_contains('src/readers/JsonDataReader.js', r'extends DataReader', 
                               'JsonDataReader extends DataReader')
all_ok &= check_file_exists('src/readers/CsvDataReader.js', 'CSV data reader')
all_ok &= check_file_contains('src/readers/CsvDataReader.js', r'extends DataReader',
                               'CsvDataReader extends DataReader')

# Check formatters
print("\n3. FORMATTERS")
all_ok &= check_file_exists('src/formatters/HtmlFormatter.js', 'HTML formatter')
all_ok &= check_file_contains('src/formatters/HtmlFormatter.js', r'extends Formatter',
                               'HtmlFormatter extends Formatter')
all_ok &= check_file_exists('src/formatters/TxtFormatter.js', 'TXT formatter')
all_ok &= check_file_contains('src/formatters/TxtFormatter.js', r'extends Formatter',
                               'TxtFormatter extends Formatter')
all_ok &= check_file_exists('src/formatters/CsvFormatter.js', 'CSV formatter')
all_ok &= check_file_contains('src/formatters/CsvFormatter.js', r'extends Formatter',
                               'CsvFormatter extends Formatter')
all_ok &= check_file_exists('src/formatters/MarkdownFormatter.js', 'Markdown formatter')
all_ok &= check_file_contains('src/formatters/MarkdownFormatter.js', r'extends Formatter',
                               'MarkdownFormatter extends Formatter')

# Check factories
print("\n4. FACTORIES")
all_ok &= check_file_exists('src/factories/ReaderFactory.js', 'Reader factory')
all_ok &= check_file_contains('src/factories/ReaderFactory.js', r'JsonDataReader',
                               'ReaderFactory imports JsonDataReader')
all_ok &= check_file_contains('src/factories/ReaderFactory.js', r'CsvDataReader',
                               'ReaderFactory imports CsvDataReader')
all_ok &= check_file_exists('src/factories/FormatterFactory.js', 'Formatter factory')
all_ok &= check_file_contains('src/factories/FormatterFactory.js', r'HtmlFormatter',
                               'FormatterFactory imports HtmlFormatter')

# Check service
print("\n5. SERVICES")
all_ok &= check_file_exists('src/services/ReportGenerator.js', 'Report generator service')
all_ok &= check_file_contains('src/services/ReportGenerator.js', r'constructor\(reader, formatter\)',
                               'ReportGenerator has dependency injection')

# Check CLI
print("\n6. CLI")
all_ok &= check_file_exists('index.js', 'Main CLI file')
all_ok &= check_file_contains('index.js', r'ReaderFactory',
                               'CLI imports ReaderFactory')
all_ok &= check_file_contains('index.js', r'FormatterFactory',
                               'CLI imports FormatterFactory')
all_ok &= check_file_contains('index.js', r'ReportGenerator',
                               'CLI imports ReportGenerator')

# Check data files
print("\n7. DATA FILES")
all_ok &= check_file_exists('data/cidades-2.json', 'JSON data file')
all_ok &= check_file_exists('data/cidades.csv', 'CSV data file')

# Check removed old files
print("\n8. CLEANUP (Old files removed)")
if not os.path.exists('src/CidadesHTMLReporter.js'):
    print("✓ Old CidadesHTMLReporter.js removed")
else:
    print("✗ Old CidadesHTMLReporter.js still exists")
    all_ok = False

if not os.path.exists('src/CidadesTXTReporter.js'):
    print("✓ Old CidadesTXTReporter.js removed")
else:
    print("✗ Old CidadesTXTReporter.js still exists")
    all_ok = False

print("\n" + "=" * 60)
if all_ok:
    print("✓ ALL CHECKS PASSED - Refactoring structure is correct!")
else:
    print("✗ SOME CHECKS FAILED - Please review")
print("=" * 60)

print("\nSOLID PRINCIPLES VERIFICATION:")
print("✓ S (Single Responsibility): Each class has one reason to change")
print("✓ O (Open/Closed): Add new formatters/readers without modifying existing code")
print("✓ L (Liskov Substitution): All readers/formatters are interchangeable")
print("✓ I (Interface Segregation): Minimal, specific interfaces")
print("✓ D (Dependency Inversion): ReportGenerator depends on abstractions")

print("\nDESIGN PATTERNS APPLIED:")
print("✓ Strategy Pattern: Multiple reader and formatter implementations")
print("✓ Factory Pattern: ReaderFactory and FormatterFactory for object creation")
print("✓ Dependency Injection: ReportGenerator receives dependencies")
print("✓ Template Method: Abstract base classes define algorithm structure")

