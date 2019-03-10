import Router from 'koa-router';
import _omit from 'lodash.omit';

import userCtrls from '../controllers/user.ctrl';
import { userSessionKey } from '../../config';

const { loginCtrl, logOutCtrl } = userCtrls;

const isApiAuthed = (ctx, next) => {
  if (!ctx.isAuthenticated()) {
    if (ctx.req.url === '/api/auth/logout') {
      ctx.cookies.set(userSessionKey, '');
      ctx.redirect('/login');
      return;
    }
    // Throw the error to axios onError.
    ctx.throw(401, 'API request does not authenticated!');
  } else {
    return next();
  }
};

const router = new Router({
  prefix: '/api'
});

router.get('/profile', isApiAuthed, async (ctx, next) => {
  ctx.status = 200;
  ctx.body = _omit(ctx.state.user, 'password');
  // ctx.body = {
  //   username: 'demo',
  //   id: '1'
  // };
});

// Add POST - /api/auth/login
router.post('/auth/login', loginCtrl);

// Add POST - /api/auth/logout
router.post('/auth/logout', isApiAuthed, logOutCtrl);

export default router;
