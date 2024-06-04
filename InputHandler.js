const readlineSync = require('readline-sync');

const getChar = (promptText) => {
  const input = readlineSync.question(promptText);
  return input;
};

const getLine = (promptText) => {
  const input = readlineSync.question(promptText);
  return input.trim();
};

module.exports = { getChar, getLine };