import Session from 'koa-session';

import { server } from '../../config';

export default app => {
  app.use(Session(server.session, app));
};
