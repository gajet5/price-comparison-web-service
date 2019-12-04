const fs = require('fs-extra');
const path = require('path');

module.exports = {
  async getParsers() {
    const parsers = await fs.readdir(path.join(__dirname, '..', '..', 'parsers'));
    return parsers.map(fileName => fileName.slice(0, -3));
  }
};
