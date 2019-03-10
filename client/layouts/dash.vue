<template>
  <VApp
    id="DashLayout"
    dark class="dash__layout"
  >
    <DashDrawer />
    <NavBar />
    <VContent>
      <nuxt />
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

  import DashDrawer from '~/components/dash/dash-drawer';
  import NavBar from '~/components/dash/navbar';

  export default {
    middleware: 'auth',
    components: {
      DashDrawer,
      NavBar
    },
    data: () => ({
      dialog: false
    }),
    methods: {
      ...mapMutations({
        reqErrorBar: 'reqErrorBar',
        optTipsBar: 'optTipsBar'
      }),
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
