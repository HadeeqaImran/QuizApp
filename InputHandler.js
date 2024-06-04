const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

const getChar = () => {
  return new Promise((resolve) => {
    const onDataHandler = (key) => {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      rl.output.write('\n');
      process.stdin.removeListener('data', onDataHandler);
      resolve(key.toString().trim());
    };

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', onDataHandler);
  });
};

const getLine = (promptText) => {
  return new Promise((resolve) => {
    rl.question(promptText, (input) => {
      resolve(input);
    });
  });
};

module.exports = { getChar, getLine };
