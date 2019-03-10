<template>
  <VNavigationDrawer
    v-model="drawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    light
    fixed
    app
    width="220"
    class="py-3"
    style="z-index: 10"
  >
    <VList dense>
      <template v-for="item in items">
        <VListTile
          :key="item.text"
          active-class="primary--text"
          ripple
          :nuxt="true"
          :to="item.href"
        >
          <VListTileAction style="margin-left: 12px">
            <VIcon size="16">
              {{ item.icon }}
            </VIcon>
          </VListTileAction>
          <VListTileContent style="margin-left: -24px" class="mr-3">
            <VListTileTitle>
              {{ item.text }}
            </VListTileTitle>
          </VListTileContent>
        </VListTile>
      </template>
    </VList>
    <VFooter fixed color="transparent">
      <VLayout justify-center row wrap>
        <VFlex
          lighten-2 text-xs-center grey--text xs12
          class="caption font-weight-thin"
        >
          <div><strong>{{ appName }} v{{ appVersion }}</strong></div>
          <div>&copy; {{ new Date().getFullYear() }} by Cloudy Bay</div>
        </VFlex>
      </VLayout>
    </VFooter>
  </VNavigationDrawer>
</template>

<script>
  import { app } from '~~/config';

  export default {
    data: () => {
      const items = [
        { icon: 'dashboard', text: 'Dashboard', href: '/' },
        { icon: 'table_chart', text: 'Inventory', href: '/inventory' }
      ];

      return {
        items,
        appName: app.name,
        appVersion: app.version
      };
    },
    computed: {
      drawer: {
        get: function() {
          return this.$store.state.dash.drawer;
        },
        set: function(value) {
          this.$store.commit('TOGGLE_DASH_DRAWER', { value });
        }
      }
    },
    created() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        this.$store.commit('TOGGLE_DASH_DRAWER', { value: false });
      }
    }
  };
</script>
