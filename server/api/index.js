const express = require('express');
const graphqlMiddleware = require('express-graphql');

const schema = require('./schemas');
const rootValue = require('./resolvers');

const api = express();

api.all('/', graphqlMiddleware({
    graphiql: true,
    schema,
    rootValue
}));

module.exports = api;
