const moment = require('moment');
const parsersMoedel = require('../models/parsers');
const path = require('path');

module.exports = async () => {
  const parsers = await parsersMoedel.find();

  for (let i = 0; i < parsers.length; i += 1) {
    const currentTime = +moment();
    const { url, parser, times, nextScanTime } = parsers[i];
    const siteParser = require(path.join(__dirname, '..', 'parsers', parser));

    if (nextScanTime < currentTime) {
      await siteParser(url);
      await parsers[i].updateOne({
        nextScanTime: +moment(currentTime).add(`${times}w`)
      });
    }
  }
};
