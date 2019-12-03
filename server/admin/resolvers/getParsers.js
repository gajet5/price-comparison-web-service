const fs = require('fs-extra');
const path = require('path');

module.exports = {
  async getParsers() {
    const parsers = await fs.readdir(path.join(__dirname, '..', 'parsers'));

    return {
      status: 200,
      message: 'Ok',
      parsers: parsers.map(fileName => fileName.slice(0, -3))
    };
  }
};
