const fs = require('fs');
const path = require('path');

let resolvers = {};
const files = fs.readdirSync(path.join(__dirname));

for (const file of files) {
    if (/index/.test(file)) {
        continue;
    }
    resolvers = Object.assign(resolvers, require(path.join(__dirname, file)));
}

module.exports = resolvers;
