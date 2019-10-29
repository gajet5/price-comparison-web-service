const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const nightmare = Nightmare({ show: true });

function getData(html) {
  const data = [];
  const $ = cheerio.load(html);
  const items = $('.catalog-item');

  for (let i = 0; i < items.length; i += 1) {
    const title = $(items[i]).find('a.item-title > span.clamp').text();

    data.push({
      title,
      price: $(items[i]).find('div.price > span.actual-price > span[content]').attr('content'),
      capacity: /.* (\d{2,4}) ГБ.*/.exec(title)[1]
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
  console.log(result);
};
