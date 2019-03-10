export default {
  100: 'Continue',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error!',
  // Customized Res Code
  0: '请求成功!',
  '-1': '系统错误',
  100001: '用户名或密码填写有误',
  100002: '该用户名已存在',
  200001: '分页参数错误',
  300001: '参数错误',
  400001: 'TokenError',
  600001: '无效token',
  401001: {
    code: 401001,
    title: 'Invalid Username or Password!',
    message: 'Please check and confirm your Username and Password, try again!'
  }
};
