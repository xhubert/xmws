import { server } from '../../config';
import logger from './_logger';
import session from './_session';
import initPassport from './_passport';
import onError from './_on-error';

const { secret, md5Key } = server;

export default async app => {
  /**
   * app keys for Koa
   * Required for cookie signature generation.
   * It must be set before session.
   **/
  app.proxy = true;
  app.keys = [secret, md5Key];
  logger(app);
  session(app);
  initPassport(app);
  onError(app);
};
