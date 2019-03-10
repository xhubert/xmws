import _find from 'lodash.find';
import users from '../models/user.model';

const findUserByUsername = async username => {
  return _find(users, { username });
};

const findUserById = async id => {
  return _find(users, { id });
};

export default {
  findUserById,
  findUserByUsername
};
