const { readCsv } = require('./CsvUtilities');
const { getChar } = require('./InputHandler');

const Quiz = async (filePath, headers) => {
  let score = 0;
  const data = await readCsv(filePath, headers);
  for (let i = 0; i < 5; i++) {
    const randomNumber = Math.floor(Math.random() * data.length);
    console.log(data[randomNumber].question);
    console.log(data[randomNumber].a);
    console.log(data[randomNumber].b);
    console.log(data[randomNumber].c);
    console.log(data[randomNumber].d);
    console.log("Enter Answer (a, b, c, d): ");
    const answer = await getChar();
    if (answer === data[randomNumber].correct_option) {
      score += 1;
    }
  }
  return score;
};

module.exports = { Quiz };
