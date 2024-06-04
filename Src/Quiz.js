const { readCSV } = require('../Services/CSVUtilities');
const { getChar } = require('../Services/InputHandler');

const quiz = (filePath, headers) => {
  let score = 0;
  const data = readCSV(filePath, headers);
  let uniqueRandomNumbersSet = new Set();
  while(uniqueRandomNumbersSet.size < 5) {
    uniqueRandomNumbersSet.add(Math.floor(Math.random() * 20))
  }
  let uniqueRandomNumbers = [...uniqueRandomNumbersSet];
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

module.exports = { quiz };
