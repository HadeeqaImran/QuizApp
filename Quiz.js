const { readCsv } = require('./CsvUtilities');
const { getChar } = require('./InputHandler');

const Quiz = (filePath, headers, username) => {
  let score = 0;
  const data = readCsv(filePath, headers);
  const uniqueRandomNumbers = [...new Set(Array(5).fill(0).map(() => Math.floor(Math.random() * 20)))];
  for (let i = 0; i < 5; i++) {
    const randomNumber = Math.floor(Math.random() * data.length);
    console.log(data[uniqueRandomNumbers[i]].question);
    console.log(`a) ${data[uniqueRandomNumbers[i]].a}`);
    console.log(`b) ${data[uniqueRandomNumbers[i]].b}`);
    console.log(`c) ${data[uniqueRandomNumbers[i]].c}`);
    console.log(`d) ${data[uniqueRandomNumbers[i]].d}`);
    const answer = getChar("Enter choice (a, b, c, d): ");
    if (answer === data[uniqueRandomNumbers[i]].correct_option) {
      score += 1;
    }
    console.log("\n")
  }
  return score;
};

module.exports = { Quiz };
