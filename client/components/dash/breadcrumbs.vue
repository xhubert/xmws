<template>
  <VBreadcrumbs divider="/">
    <template v-for="(item, key) in breadcrumbs">
      <VBreadcrumbsItem
        :disabled="item.disabled"
        :nuxt="item.nuxt"
        exact
        v-if="item.nuxt"
        :to="item.to"
        :key="key"
      >
        {{ item.text }}
      </VBreadcrumbsItem>
      <VBreadcrumbsItem
        :disabled="item.disabled"
        :nuxt="item.nuxt"
        exact
        :key="key"
        v-else
      >
        {{ item.text }}
      </VBreadcrumbsItem>
    </template>
  </VBreadcrumbs>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BreadCrumbs',
  computed: {
    ...mapGetters(['breadcrumbs'])
  }
};
</script>
