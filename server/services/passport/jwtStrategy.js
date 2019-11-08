const { Strategy, ExtractJwt } = require('passport-jwt');
const usersModel = require('../../models/users');
const { jwtSecret } = require('../../config');

const options = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = passport => {
  passport.use(new Strategy(options, async (payload, done) => {
    try {
      const user = await usersModel.findById(payload.id);
      if (!user) return done(null, false);
      done(null, user);
    } catch (e) {
      done(e);
    }
  }));
};
