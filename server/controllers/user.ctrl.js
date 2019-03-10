import passport from 'koa-passport';
import _omit from 'lodash.omit';

import { userSessionKey, server } from '../../config';

/* Auth Controller */
const loginCtrl = async (ctx, next) => {
  return passport.authenticate(
    'local',
    {
      badRequestMessage: 'Please input Username & Password!'
    },
    async (err, user, info) => {
      if (err) {
        return ctx.throw(err);
      } else if (!user) {
        ctx.status = 401;
        ctx.body = info;
      } else {
        await ctx.login(user);
        ctx.status = 200;
        const profile = _omit(ctx.state.user, 'password');
        ctx.body = profile;
        ctx.cookies.set(
          userSessionKey,
          JSON.stringify(profile),
          { maxAge: server.session.maxAge }
        );
      }
    }
  )(ctx, next);
};

const logOutCtrl = async (ctx, next) => {
  await ctx.logout();
  ctx.cookies.set(userSessionKey, '');
  ctx.cookies.set(server.session.key, '');
  if (server.session.signed) {
    ctx.cookies.set(`${userSessionKey}.sig`, '');
    ctx.cookies.set(`${server.session.key}.sig`, '');
  }
  ctx.status = 200;
  ctx.body = {
    success: true
  };
};

export default {
  loginCtrl,
  logOutCtrl
};
