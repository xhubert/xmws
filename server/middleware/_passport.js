/**
 * Module dependencies.
 */
import passport from 'koa-passport';
import passportLocal from 'passport-local';

import userServices from '../services/user.service';
import Utils from '../utils';

const { Crypto, Response } = Utils;

const LocalStrategy = passportLocal.Strategy;
const { findUserByUsername, findUserById } = userServices;

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const initLocalStrategy = () => {
  // Use local strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password'
      },
      async (username, password, done) => {
        try {
          const md5Password = Crypto.md5(password);
          const user = await findUserByUsername(username);
          if (!user) {
            return done(null, false, Response(401001));
          } else if (md5Password !== user.password) {
            return done(null, false, Response(401001));
          } else {
            return done(null, user);
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};

const initPassport = () => {
  initLocalStrategy();
};

export default app => {
  initPassport();
  app.use(passport.initialize());
  app.use(passport.session());
};
