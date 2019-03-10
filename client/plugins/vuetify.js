import Vue from 'vue';
// import Vuetify, {
//   VApp, // required
//   VNavigationDrawer,
//   VFooter,
//   VToolbar,
//   VDataTable
// } from 'vuetify/lib';
import Vuetify from 'vuetify/lib';
import { Ripple } from 'vuetify/lib/directives';

Vue.use(Vuetify, {
  // components: {
  //   VApp,
  //   VNavigationDrawer,
  //   VFooter,
  //   VToolbar,
  //   VDataTable
  // },
  directives: {
    Ripple
  }
  // theme: {
  //   primary: '#9c27b0',
  //   accent: '#ce93d8',
  //   secondary: '#424242',
  //   info: '#0D47A1',
  //   warning: '#ffb300',
  //   error: '#B71C1C',
  //   success: '#2E7D32'
  // }
});
