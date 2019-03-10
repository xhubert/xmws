/**
 * Module dependencies.
 */
import Utils from '../utils';

const { Crypto } = Utils;

/**
 * A Validation function for local strategy password
 */
// const validateLocalStrategyPassword = (password) => {
//   return this.provider !== 'local' || Crypto.isValidPassword(password);
// };

export default [
  {
    id: '1',
    username: 'demo',
    password: Crypto.md5('demo')
  }
];
