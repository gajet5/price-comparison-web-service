const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const productsModel = require('../models/products');

const nightmare = Nightmare({ show: false });

function getData(html) {
  const data = [];
  const $ = cheerio.load(html);
  const items = $('.catalog-item');

  for (let i = 0; i < items.length; i += 1) {
    const title = $(items[i]).find('a.item-title > span.clamp').text();
    const price = $(items[i]).find('div.price > span.actual-price > span[content]').attr('content');
    const capacity = /.* (\d{2,4}) ГБ.*/.exec(title)[1];

    data.push({
      title,
      price: parseInt(price),
      capacity: parseInt(capacity)
    });
  }

  return data;
}

module.exports = async (url) => {
  await nightmare.goto(url).wait('div.catalog-item.with-heart.ddl_product');

  let currentHeight = 0;
  let previousHeight = -1;

  while (previousHeight !== currentHeight) {
    previousHeight = currentHeight;

    currentHeight = await nightmare.evaluate(() => document.body.scrollHeight);
    await nightmare.scrollTo(currentHeight, 0).wait(3000);
  }

  const result = getData(await nightmare.evaluate(() => document.querySelector('.catalog-items').innerHTML));
  await nightmare.end();

  for (const item of result) {
    const product = await productsModel.findOne({
      parser: 're-store.ru',
      url,
      title: item.title,
      capacity: item.capacity
    });

    if (product) {
      await product.updateOne({
        price: item.price
      });
    } else {
      await productsModel.create({
        parser: 're-store.ru',
        url,
        title: item.title,
        price: item.price,
        capacity: item.capacity
      });
    }
  }
};
