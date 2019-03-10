import appConfig from '../../config';

const { resCode } = appConfig;

export default (code, message) => {
  if (code === null || !resCode[code]) {
    return {
      code: 500,
      title: resCode[500],
      message
    };
  }
  if (typeof resCode[code] === 'object') {
    return resCode[code];
  } else {
    return {
      code,
      title: resCode[code],
      message
    };
  }
};
