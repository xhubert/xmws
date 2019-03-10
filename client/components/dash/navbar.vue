<template>
  <VToolbar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    color="blue darken-3"
    dark
    app
    fixed
    height="50"
    style="z-index: 8;"
  >
    <VToolbarSideIcon @click.stop="toggleDrawer" />
    <VToolbarTitle class="ml-0 mr-3 white--text" style="width: 143px">
      <span class="hidden-sm-and-down">
        xMws Tools
      </span>
    </VToolbarTitle>
    <VSpacer></VSpacer>
    <VBtn icon>
      <VIcon>
        notifications
      </VIcon>
    </VBtn>
    <VMenu
      offset-y
      left
      :min-width="200"
      transition="slide-y-transition"
      width="50"
    >
      <VBtn slot="activator" fab dark color="pink">
        <VAvatar size="32px" tile>
          <img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          >
        </VAvatar>
      </VBtn>
      <VList>
        <VListTile key="0" @click.stop="logOut">
          <VListTileTitle>
            Log Out
          </VListTileTitle>
        </VListTile>
      </VList>
    </VMenu>
  </VToolbar>
</template>

<script>
  export default {
    methods: {
      toggleDrawer: function() {
        this.$store.commit(
          'TOGGLE_DASH_DRAWER',
          { value: !this.$store.state.dash.drawer }
        );
      },
      logOut() {
        this.$store.dispatch('users/logOut', { token: this.$store.state.token });
      }
    }
  };
</script>
