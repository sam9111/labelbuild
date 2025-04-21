/**
 * Converts Shopify order CSV data to JSON
 * This version handles direct CSV text input with proper handling of quoted fields
 */

/**
 * Main function to convert CSV text to JSON objects
 * @param csvText The raw CSV text
 * @returns Array of objects with header keys and row values
 */
function csvToJson(csvText: string): Record<string, string>[] {
  try {
    // Split the CSV into lines
    const lines = csvText.split("\n").filter((line) => line.trim() !== "");

    if (lines.length === 0) {
      throw new Error("CSV is empty or contains no valid lines");
    }

    // Extract headers from the first line
    const headers = parseCSVLine(lines[0]);

    // Process each data row
    const result: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i] || lines[i].trim() === "") continue;

      const values = parseCSVLine(lines[i]);
      const orderObj: Record<string, string> = {};

      // Only use as many values as we have headers
      const valuesCount = Math.min(headers.length, values.length);

      for (let j = 0; j < valuesCount; j++) {
        orderObj[headers[j]] = values[j];
      }

      result.push(orderObj);
    }

    return result;
  } catch (error) {
    console.error("Error parsing CSV data:", error);
    return [];
  }
}

/**
 * Parses a single CSV line, respecting quoted fields that may contain commas
 * @param line A single line of CSV text
 * @returns Array of field values
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let currentValue = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      // Handle quote characters
      if (insideQuotes && i + 1 < line.length && line[i + 1] === '"') {
        // This is an escaped quote inside a quoted field (double quotes)
        currentValue += '"';
        i++; // Skip the next quote character
      } else {
        // Toggle quote status
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      // If we're not inside quotes and find a comma, it's a field separator
      result.push(currentValue);
      currentValue = "";
    } else {
      // Any other character is part of the value
      currentValue += char;
    }
  }

  // Add the last value
  result.push(currentValue);

  return result;
}

export default csvToJson;
