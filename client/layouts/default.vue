<template>
  <VApp dark>
    <VContent>
      <nuxt />
    </VContent>
    <VFooter fixed app color="primary">
      <VLayout justify-center row wrap>
        <VFlex
          lighten-2 text-xs-center white--text xs12
          class="caption font-weight-thin"
        >
          <strong>
            xMws
          </strong>
          &copy; {{ new Date().getFullYear() }} by Cloudy Bay
        </VFlex>
      </VLayout>
    </VFooter>
  </VApp>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      };
    }
  };
</script>
