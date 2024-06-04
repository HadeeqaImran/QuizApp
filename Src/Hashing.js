const crypto = require('crypto');

const hashInput = (input) => {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
};

module.exports = { hashInput };
  