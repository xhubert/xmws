import createPersistedState from 'vuex-persistedstate';

export default ctx => {
  const key = 'xmws-state';
  try {
    createPersistedState({
      key,
      storage: window.localStorage,
      reducer: () => {
        return {
          dash: ctx.store.state.dash,
          user: ctx.store.state.user
        };
      }
    })(ctx.store);
  } catch (error) {
    window.localStorage.remove(key);
  }
};
