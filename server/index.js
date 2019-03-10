import Koa from 'koa';
import consola from 'consola';
import bodyParser from 'koa-bodyparser';
import { Nuxt, Builder } from 'nuxt';

import { server } from '../config';
import initRoutes from './routes';
import nuxtConfig from '../nuxt.config.js';
import initMiddleWare from './middleware';

const HOST = server.host;
const PORT = server.port;

// const errorLogger = consola.withScope(`ERROR`);

const start = async () => {
  const app = new Koa();
  const appLogger = consola.withScope(`APP`);

  // 1. Body Parser must be the first step;
  app.use(bodyParser());

  // 2. Inject Middlewares are imported here.
  await initMiddleWare(app);

  // 3. Routes are imported here.
  initRoutes(app);

  // 4. Import and Set Nuxt.js options
  nuxtConfig.dev = !(app.env === 'production');
  // Instantiate nuxt.js
  const nuxt = new Nuxt(nuxtConfig);
  // Build in development
  if (nuxtConfig.dev) {
    appLogger.info(`SPA build for dev`);
    const builder = new Builder(nuxt);
    await builder.build();
  }

  app.use(ctx => {
    // const start = new Date();
    ctx.status = 200; // koa defaults to 404 when it sees that status is unset
    // const ms = new Date() - start;
    // appLogger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve);
      ctx.res.on('finish', resolve);
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject);
      });
    });
  });

  app.on('error', async (err, ctx) => {
    ctx.req.error = err;
    console.error('onError', err);
  });

  app.listen(PORT, HOST, () => {
    consola.ready({
      message: `Server listening on http://${HOST}:${PORT}`,
      badge: true
    });
  });
};

start();
