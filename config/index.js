import pkg from '../package.json';
import resCode from './_res-code';

const appConfig = {
  app: {
    name: 'xMws',
    version: pkg.version,
    desc: pkg.description
  },
  server: {
    // process.env.HOST || '127.0.0.1';
    port: process.env.NODE_ENV === 'development' ? 3000 : 3000,
    // process.env.PORT || 3000;
    host: process.env.NODE_ENV === 'development' ? '127.0.0.1' : '127.0.0.1',
    // Secret is for jwt. (both koa-jwt and jsonwebtoken)
    secret: '-xmws-app-secret-',
    // xmws-of-cloudy-bay-lighting
    md5Key: '0dff6068a1d3ff862637c376122b91c9',
    session: {
      /** (string) cookie key (default is koa:sess) */
      key: 'xmws:sess',
      // session expiration is set by default to 24 hours
      maxAge: 24 * (60 * 60 * 1000),
      // boolean, can overwrite or not (default true)
      overwrite: true,
      // boolean, httpOnly or not (default true)
      httpOnly: true,
      // boolean, signed or not (default true)
      signed: true,
      /**
       * boolean
       * Force a session identifier cookie to be set on every response.
       * The expiration is reset to the original maxAge,
       * resetting the expiration countdown.
       * default is false
       **/
      rolling: false
    }
  },
  resCode
};

export default appConfig;

export const app = appConfig.app;
export const server = appConfig.server;
export const userSessionKey = `${appConfig.server.session.key}.user`;
