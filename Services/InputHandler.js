const readlineSync = require('readline-sync');

const getChar = (promptText) => {
  const input = readlineSync.keyIn(promptText, { limit: 'abcdefghijklmnopqrstuvwxyz12345' });
  return input;
};

const getLine = (promptText, inputType) => {
  const options = {};
  if (inputType === 'password') {
    options.hideEchoBack = true;
    options.mask = '*';
  }
  const input = readlineSync.question(promptText, options);
  return input.trim();
};

module.exports = { getChar, getLine };