<template>
  <VContainer fluid fill-height>
    <VLayout align-center justify-center>
      <VFlex xs12 sm8 md4>
        <VCard>
          <VCardText class="pb-4 text-xs-center">
            <VIcon size="48" color="pink">
              error
            </VIcon>
            <div v-if="statusCode === 404">
              <h2>
                Page not found(401)
              </h2>
              <div class="subheading font-weight-thin mb-4">
                {{ message }}
              </div>
              <VBtn ripple :nuxt="true" to="/" color="pink">
                Back to Home
              </VBtn>
            </div>
            <div v-else-if="statusCode === 401">
              <h2>
                Unauthorized(401)
              </h2>
              <div class="subheading font-weight-thin mb-4">
                {{ message }}
              </div>
              <VBtn ripple href="/login" color="pink">
                Log In
              </VBtn>
            </div>
            <div v-else-if="statusCode === 403">
              <h2>
                Forbidden(403)
              </h2>
              <div class="subheading font-weight-thin mb-4">
                {{ message }}
              </div>
            </div>
            <div v-else-if="statusCode === 500">
              <h2>
                Internal Server Error(500)
              </h2>
              <div class="subheading font-weight-thin mb-4">
                {{ message }}
              </div>
            </div>
            <div v-else>
              <h2>An error occurred {{ error }}</h2>
              <div class="subheading font-weight-thin mb-4">
                Unknown Error.{{ message }}
              </div>
            </div>
          </VCardText>
        </VCard>
      </VFlex>
    </VLayout>
  </VContainer>
</template>

<script>
  export default {
    name: 'NuxtError',
    props: {
      error: {
        type: Object,
        default: null
      }
    },
    head() {
      return {
        title: this.statusCode,
        meta: [
          {
            name: 'viewport',
            content:
              'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
          }
        ]
      };
    },
    computed: {
      statusCode() {
        return this.error ? (this.error.status || this.error.statusCode) : 500;
      },
      message() {
        return this.error.message || `<%= messages.client_error %>`;
      }
    }
  };
</script>
