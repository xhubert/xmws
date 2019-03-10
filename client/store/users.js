import { server } from '~~/config';

const userSessionKey = `${server.session.key}.user`;

const getUserCookie = req => {
  if (!req.headers.cookie) return;
  const cookies = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${userSessionKey}=`));
  if (!cookies) return;
  const userCookie = cookies.split('=')[1];
  return userCookie;
};

const getPassportCookie = req => {
  if (!req.headers.cookie) return;
  const cookies = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${server.session.key}=`));
  if (!cookies) return;
  const passportCookie = cookies.split('=')[1];
  return passportCookie;
};

export const state = () => ({
  token: '',
  user: null
});

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER(state, data) {
    state.user = data;
  }
};

export const getters = {
  isAuthed: state => {
    return !!state.token && !!state.user;
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const passport = getPassportCookie(req);
    const user = getUserCookie(req);
    if (user) {
      commit('SET_USER', JSON.parse(user));
    } else {
      commit('SET_USER', '');
    }
    commit('SET_TOKEN', passport);
  },

  async logIn({ commit }, loginFrm) {
    try {
      const response = await this.$axios.$post('/api/auth/login', loginFrm);
      commit('SET_USER', response);
      return 200;
    } catch (err) {
      return err;
    }
  },

  // LogOut
  async logOut({ commit }) {
    await this.$axios.$post('/api/auth/logout');
    commit('SET_TOKEN', '');
    commit('SET_USER', '');
    window.location.href = '/login';
  },

  async profile({ commit }) {
    try {
      await this.$axios.$get('/api/profile');
    } catch (err) {
      return err;
    }
  }
};
