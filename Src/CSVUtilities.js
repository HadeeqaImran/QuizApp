const fs = require('fs');
// CSV 
const readCSV = (filePath, headers) => {
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

// Check unique username
const appendToCSV = (filePath, newRow) => {
  const CSVRow = '\n' + Object.values(newRow).join(',');
  try {
    fs.appendFileSync(filePath, CSVRow);
    console.log('Row appended successfully.');
  } catch (err) {
    console.error('Error appending to CSV:', err);
  }
};

const writeCSV = (filePath, data) => {
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(header => row[header]).join(','));
  const CSVData = [headers.join(','), ...rows].join('\n');
  try {
    fs.writeFileSync(filePath, CSVData);
  } catch (err) {
    console.error('Error writing CSV:', err);
  }
};

module.exports = { readCSV, appendToCSV, writeCSV };
