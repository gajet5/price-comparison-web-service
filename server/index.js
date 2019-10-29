const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const { port } = require('./config');
const cors = require('cors');

const { connection } = require('./services/db');
const passport = require('./services/passport');

const api = require('./api');
const admin = require('./admin');

const server = express();
const logger = morgan('tiny');

server.use(helmet());
server.use(cors());
server.use(logger);
passport(server);

server.all('/', (req, res) => res.send('Welcome to backend.'));
server.use('/api', api);
server.use('/admin', admin);

connection.once('open', () => {
  console.log('Connected to MongoDB');
  server.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
});
