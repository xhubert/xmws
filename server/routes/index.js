import Router from 'koa-router';

import apis from './_api';

export default app => {
  const router = new Router();
  // app.use(async (ctx, next) => { await apis.routes()(ctx, next); });
  router.use(apis.routes());
  app.use(router.routes()).use(
    router.allowedMethods({
      throw: true
    })
  );
};
