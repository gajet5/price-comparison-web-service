const { buildSchema } = require('graphql');
const { fileLoader, mergeTypes } = require('merge-graphql-schemas');
const path = require('path');

const schemesArray = fileLoader(path.join(__dirname, 'gql'));

module.exports = buildSchema(mergeTypes(schemesArray, { all: true }));
