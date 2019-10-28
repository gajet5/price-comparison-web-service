const passport = require('passport');
const jwtStrategy = require('./jwtStrategy');

jwtStrategy(passport);

module.exports = (server) => {
    server.use(passport.initialize());
};
