const parsersModel = require('../../models/parsers');

module.exports = {
  async addParseTask({ url, parser, times }) {
    const isParser = await parsersModel.findOne({
      url
    });

    if (isParser) {
      return {
        status: 'warning',
        message: 'Парсер уже существует.'
      };
    }

    await parsersModel.create({
      url,
      parser,
      times,
      nextScanTime: 0
    });

    return {
      status: 'success',
      message: 'Парсер успешно добавлен'
    };
  }
};
