const express = require('express');
const graphqlMiddleware = require('express-graphql');
const path = require('path');
const resolversLoader = require('../helpers/resolversLoader');

const admin = express();

admin.all('/', graphqlMiddleware({
  graphiql: true,
  schema: require('./schemas'),
  rootValue: resolversLoader(path.join(__dirname, 'resolvers'))
}));

module.exports = admin;
