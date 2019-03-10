export const state = () => ({
  dash: {
    drawer: null
  },
  breadcrumbs: [],
  reqErrorBar: {
    show: false,
    color: '',
    mode: '',
    timeout: 6000,
    text: ''
  },
  optTipsBar: {
    show: false,
    color: '',
    mode: '',
    timeout: 6000,
    text: ''
  }
});

export const mutations = {
  SET_REQERRORBAR(state, data) {
    state.reqErrorBar = data;
  },
  SET_OPTTIPSBAR(state, data) {
    state.optTipsBar = data;
  },
  TOGGLE_DASH_DRAWER(state, payload) {
    if (payload !== undefined) {
      state.dash.drawer = payload.value;
    } else {
      state.dash.drawer = !state.dash.drawer;
    }
  },
  SET_BREADCRUMBS: (state, items) => (state.breadcrumbs = items)
};
