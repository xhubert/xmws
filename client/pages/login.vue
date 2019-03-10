<template>
  <VContainer fluid fill-height>
    <VLayout align-center justify-center>
      <VFlex xs12 sm8 md4>
        <VCard>
          <VToolbar dark color="primary" height="90">
            <VToolbarTitle>
              xMws
              <div class="subheading font-weight-thin">
                Log in to get more...
              </div>
            </VToolbarTitle>
            <VSpacer></VSpacer>
            <VAvatar>
              <VImg src="/images/logo-radius-white.png" />
            </VAvatar>
          </VToolbar>
          <VForm
            ref="loginFrm"
            :model="loginFrm"
            class="mt-1 pa-3"
            @submit.prevent="submitLogIn"
          >
            <VCardText class="py-0">
              <VAlert
                :value="error"
                type="error"
                transition="slide-y-reverse-transition"
              >
                {{ error }}
              </VAlert>
            </VCardText>
            <VCardText>
              <VTextField
                v-model="loginFrm.username"
                prepend-icon="person"
                name="login"
                label="Username"
                type="text"
                :autofocus="true"
                :box="true"
              />
              <VTextField
                id="password"
                v-model="loginFrm.password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                :box="true"
              />
            </VCardText>
            <VCardActions class="pa-3">
              <VSpacer></VSpacer>
              <VBtn
                type="submit"
                color="primary"
                large
                :loading="isLogging"
                :disabled="isLogging"
              >
                Log in
              </VBtn>
            </VCardActions>
          </VForm>
        </VCard>
      </VFlex>
    </VLayout>
  </VContainer>
</template>

<script>
  export default {
    middleware: 'redirect',
    head: {
      title: 'Login'
    },
    data: () => ({
      isLogging: false,
      error: '',
      loginFrm: {
        username: '',
        password: ''
      },
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      checkbox: false,
      drawer: null
    }),
    methods: {
      async submitLogIn() {
        this.error = '';
        if (!this.loginFrm.username) {
          this.error = 'Username is required!';
          return false;
        }
        if (!this.loginFrm.password) {
          this.error = 'Password is required!';
          return false;
        }
        this.isLogging = true;
        this.error = '';
        const result = await this.$store.dispatch('users/logIn', this.loginFrm);
        if (result === 200) {
          // OK
          window.location.href = '/';
        } else {
          this.error = result.message;
        }
        this.isLogging = false;
      }
    }
  };
</script>
