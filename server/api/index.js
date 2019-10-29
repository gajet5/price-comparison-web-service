const express = require('express');
const graphqlMiddleware = require('express-graphql');

const api = express();

api.all('/', graphqlMiddleware({
  graphiql: true,
  schema: require('./schemas'),
  rootValue: require('./resolvers')
}));

module.exports = api;
