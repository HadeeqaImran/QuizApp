const fs = require('fs');
const csv = require('csv-parser');
const fastCsv = require('fast-csv');

const readCsv = (filePath, headers) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv({ headers, skipLines: 1 }))
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

const appendToCsv = (filePath, newRow) => {
  return new Promise((resolve, reject) => {
    const csvRow = Object.values(newRow).join(',') + '\n';
    fs.appendFile(filePath, csvRow, (err) => {
      if (err) {
        reject('Error appending to CSV:', err);
      } else {
        resolve('Row appended successfully.');
      }
    });
  });
};

const writeCsv = (filePath, data) => {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(filePath);
    fastCsv
      .write(data, { headers: true })
      .pipe(ws)
      .on('finish', () => {
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

module.exports = { readCsv, appendToCsv, writeCsv };
