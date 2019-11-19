const express = require('express');
const graphqlMiddleware = require('express-graphql');
const path = require('path');
const passport = require('passport');

const resolversLoader = require('../helpers/resolversLoader');
const schemasBuilder = require('../helpers/schemasBuilder');

const admin = express();

admin.use(passport.authenticate('jwt', {
  session: false
}));

admin.all('/', graphqlMiddleware({
  graphiql: true,
  schema: schemasBuilder(path.join(__dirname, 'schemas')),
  rootValue: resolversLoader(path.join(__dirname, 'resolvers'))
}));

module.exports = admin;
