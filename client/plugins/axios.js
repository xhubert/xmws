// import appConfig from '../../config';

// const { resCode } = appConfig;

export default ({ $axios, error, store }) => {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url);
  });
  $axios.onError((err) => {
    let code = parseInt(err.response && err.response.status);
    let errMsg = err.message;

    if (
      err.response &&
      err.response.status === 401 &&
      err.response.statusText === 'Unauthorized'
    ) {
      if (!err.response.data.code) {
        error({
          statusCode: 401,
          message: 'Login has expired, please log in again!'
        });
      } else {
        // Throw the customized error for Actions.
        throw new Error(err.response.data.message || err.response.statusText);
      }
    }
    if (err.response && err.response.data && err.response.data.code) {
      store.commit('SET_REQERRORBAR', {
        show: true,
        text: `${err.response.data.message}(${err.response.data.code})`
      });
      return;
    }
    throw new Error(code, errMsg);
  });
};
