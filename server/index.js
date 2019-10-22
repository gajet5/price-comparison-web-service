const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const { port } = require('./config');
const cors = require('cors');

const { connection } = require('./services/db');

const server = express();
const logger = morgan('tiny');

server.use(helmet());
server.use(cors());
server.use(logger);

connection.once('open', () => {
    console.log('Connected to MongoDB');
    server.listen(port, () => {
        console.log(`PCWS server online on http://localhost:${port}`);
    });
});
