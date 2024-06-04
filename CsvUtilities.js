const fs = require('fs');
const fastCsv = require('fast-csv');

const readCsv = (filePath, headers) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const rows = data.split('\n').slice(1); // Skip headers
  return rows.map(row => {
    const values = row.split(',');
    const result = {};
    headers.forEach((header, index) => {
      result[header] = values[index];
    });
    return result;
  });
};

const appendToCsv = (filePath, newRow) => {
  const csvRow = '\n' + Object.values(newRow).join(',');
  try {
    fs.appendFileSync(filePath, csvRow);
    console.log('Row appended successfully.');
  } catch (err) {
    console.error('Error appending to CSV:', err);
  }
};

const writeCsv = (filePath, data) => {
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(header => row[header]).join(','));
  const csvData = [headers.join(','), ...rows].join('\n');
  try {
    fs.writeFileSync(filePath, csvData);
  } catch (err) {
    console.error('Error writing CSV:', err);
  }
};

module.exports = { readCsv, appendToCsv, writeCsv };
