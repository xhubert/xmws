<template>
  <VToolbar dense flat height="48" color="grey darken-3">
    <VToolbarTitle class="mr-2">
      {{ pageTitle }}
      <small
        v-if="!!subTitle || subtitle !== '...'"
        class="ml-2 font-weight-thin grey--text"
      >
        {{ subTitle }}
      </small>
      <small
        v-else
        class="ml-2 font-weight-thin grey--text"
      >
        &nbsp;
      </small>
    </VToolbarTitle>
    <VSpacer></VSpacer>
    <VMenu
      offset-y
      left
      light
      :min-width="150"
      transition="slide-y-transition"
      width="51"
    >
      <VBtn slot="activator" icon>
        <VIcon>
          drag_indicator
        </VIcon>
      </VBtn>
      <VList>
        <template v-for="(type, key) in tools">
          <VListTile
            :key="key"
            exact
            active-class="primary--text"
            ripple
            :to="type.href"
            :nuxt="true"
          >
            <VListTileTitle>
              {{ type.title }}
            </VListTileTitle>
          </VListTile>
        </template>
      </VList>
    </VMenu>
  </VToolbar>
</template>

<script>
  export default {
    props: {
      pageTitle: {
        type: String,
        default: () => ('...')
      },
      subTitle: {
        type: String,
        default: () => ('...')
      },
      tools: {
        type: Array,
        default: () => ([])
      }
    }
  };
</script>
