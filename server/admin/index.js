const express = require('express');
// const graphqlMiddleware = require('express-graphql');
//
// const schema = require('./schemas');
// const rootValue = require('./resolvers');

const admin = express();

// admin.all('/', graphqlMiddleware({
//     graphiql: true,
//     schema,
//     rootValue
// }));

admin.all('/', (req, res) => res.send('Admin'));

module.exports = admin;
