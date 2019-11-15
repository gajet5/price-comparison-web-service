const fs = require('fs');
const path = require('path');

module.exports = (resolversFolder) => {
  let resolvers = {};
  const files = fs.readdirSync(resolversFolder);

  for (const file of files) {
    resolvers = Object.assign(resolvers, require(path.join(resolversFolder, file)));
  }

  return resolvers;
};
