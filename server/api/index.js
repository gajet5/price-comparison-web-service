const express = require('express');
const graphqlMiddleware = require('express-graphql');

const api = express();

const graphqlMiddlewareInstance = graphqlMiddleware({
  graphiql: true,
  schema: require('./schemas'),
  rootValue: require('./resolvers')
});

api.all('/', graphqlMiddlewareInstance);

module.exports = api;
