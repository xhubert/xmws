import nodeExternals from 'webpack-node-externals';
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin';

import { app, server } from './config';
import pkg from './package.json';

export default {
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: `%s - ${app.name}`,
    meta: [
      { charset: `utf-8` },
      { name: `viewport`, content: `width=device-width, initial-scale=1` },
      { 'http-equiv': `X-UA-Compatible`, content: `IE=edge` },
      { hid: `author`, name: `author`, content: pkg.author },
      { hid: `description`, name: `description`, content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ],
    noscript: [
      {
        innerHTML: `
        <p class="no-script-message">
          Javascript is disabled but no worries everything should be fine
        </p>`
      }
    ],
    __dangerouslyDisableSanitizers: ['noscript']
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#009688' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl'],

  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/axios.js',
    '~/plugins/moment.js',
    '~/plugins/persist-state.client.js'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: `http://${server.host}:${server.port}`,
    credentials: true
  },
  srcDir: 'client/',

  // router: {
  //   middleware: ['server-error-handler']
  // },
  /*
   ** Build configuration
   */
  build: {
    watch: ['static/data/*.json'],
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[chunkhash].js')
    },

    publicPath: '/_static/',
    transpile: [/^vuetify/],
    plugins: [new VuetifyLoaderPlugin()],
    extractCSS: true,
    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ];
      }
    }
  }
};
