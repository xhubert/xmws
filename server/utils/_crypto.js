import crypto from 'crypto';

const md5 = text => {
  return crypto
    .createHash('md5')
    .update(text)
    .digest('hex');
};

export default {
  md5
};
