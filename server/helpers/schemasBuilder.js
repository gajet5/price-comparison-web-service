const { buildSchema } = require('graphql');
const { fileLoader, mergeTypes } = require('merge-graphql-schemas');

module.exports = (path) => {
  const schemesArray = fileLoader(path);
  return buildSchema(mergeTypes(schemesArray, { all: true }));
};
