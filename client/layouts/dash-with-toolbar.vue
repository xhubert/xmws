<template>
  <VApp
    id="DashLayout"
    dark class="dash__layout"
  >
    <DashDrawer />
    <NavBar />
    <VContent>
      <v-container
        fluid
        fill-height
        class="dash-container with-toolbar no-padding"
      >
        <v-layout column>
          <DashToolBar
            :page-title="pageTitle"
            :sub-title="subTitle"
            :tools="pageTools"
          />
          <nuxt />
        </v-layout>
      </v-container>
    </VContent>
    <VBtn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      style="display: none;"
      @click="dialog = !dialog"
    >
      <VIcon>
        arrow_upward
      </VIcon>
    </VBtn>
    <VSnackbar
      v-model="reqErrorBar.show"
      class="req-error__snackbar"
      color="error"
      :left="true"
      :timeout="reqErrorBar.timeout || 5000"
    >
      <VIcon>
        error
      </VIcon>
      {{ reqErrorBar.text }}
      <VBtn
        dark
        flat
        @click="hideSnakeBar(1)"
      >
        <VIcon>close</VIcon>
      </VBtn>
    </VSnackbar>
    <VSnackbar
      v-model="optTipsBar.show"
      class="opt-tips__snackbar"
      :color="optTipsBar.color || 'info'"
      :top="true"
      :timeout="optTipsBar.timeout || 5000"
    >
      <VIcon>info</VIcon>
      {{ optTipsBar.text }}
      <VBtn
        dark
        flat
        @click="hideSnakeBar(2)"
      >
        <VIcon>close</VIcon>
      </VBtn>
    </VSnackbar>
  </VApp>
</template>

<script>
  import { mapMutations } from 'vuex';
  import _find from 'lodash.find';

  import DashDrawer from '~/components/dash/dash-drawer';
  import NavBar from '~/components/dash/navbar';
  import DashToolBar from '~/components/dash/toolbar';

  const models = [{
    name: 'inventory',
    title: '库存',
    pages: ['inventory', 'inventory-analyst'],
    tools: [{
      title: '库存状况',
      href: '/inventory'
    }, {
      title: '分析报表',
      href: '/inventory/analyst'
    }]
  }];

  export default {
    middleware: 'auth',
    components: {
      DashDrawer,
      NavBar,
      DashToolBar
    },
    data: () => ({
      pageTitle: '...',
      subTitle: '...',
      pageTools: [],
      dialog: false
    }),
    watch: {
      '$route' (to, from) {
        this.getCurrentPage(to);
      }
    },
    created() {
      this.getCurrentPage(this.$route);
    },
    methods: {
      ...mapMutations({
        reqErrorBar: 'reqErrorBar',
        optTipsBar: 'optTipsBar'
      }),
      getCurrentPage(route) {
        const currentPage = _find(models, model => {
          return model.pages.includes(route.name);
        });
        this.pageTitle = currentPage.title;
        if (currentPage.tools && currentPage.tools.length > 0) {
          const ct = _find(currentPage.tools, { href: route.path });
          if (ct) {
            this.subTitle = ct.title;
          }
        }
        this.pageTools = currentPage.tools;
      },
      hideSnakeBar(type) {
        if (type === 1) {
          this.$store.commit('SET_REQERRORBAR', { show: false });
        }
        if (type === 2) {
          this.$store.commit('SET_OPTTIPSBAR', { show: false });
        }
      }
    }
  };
</script>
