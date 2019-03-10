import Utils from '../utils';

const { Response } = Utils;

export default app => {
  // Error handler middleware.
  // app.use(error({
  //   engine: 'json',
  //   template: `${__dirname}/server/veiws/error.html`
  // }));
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (!err.expose) {
        const status = err.status || err.statusCode || 500;
        ctx.status = status;
        ctx.body = Response(status);
        ctx.app.emit('error', err, ctx);
      } else {
        ctx.status = err.status || 200;
        err.success = false;
        ctx.body = err;
      }
    }
    // }
  });
};
