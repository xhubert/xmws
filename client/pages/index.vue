<template>
  <VContainer fluid fill-height>
    <VLayout align-center justify-center>
      <VFlex xs12 sm8 md4>
        <VCard>
          <VImg height="200" src="/images/amazon-ws.jpg" />
          <VCardTitle primary-title>
            <div class="headline">
              Welcome to xMws!
            </div>
          </VCardTitle>
          <VCardText class="pb-4">
            {{ desc }}
            <br />
            <div class="subheading font-weight-bold">
              <span>Hope it useful & helpful.</span>
              <VIcon size="20" class="red--text">
                favorite
              </VIcon>
              <div>{{ result }}</div>
            </div>
          </VCardText>
        </VCard>
      </VFlex>
    </VLayout>
  </VContainer>
</template>

<script>
  import { app } from '~~/config';

  export default {
    layout: 'dash',
    data: () => ({
      desc: app.desc
    }),
    asyncData: async ({ store }) => {
      const result = await store.dispatch('users/profile');
      const result1 = await store.dispatch('users/profile');
      return { result, result1 };
    },
    head: {
      title: 'Dashboard'
    }
  };
</script>
