<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col md="6">
        <v-card>
          <v-card-title class="d-flex flex-column justify-start align-start">
            <h2>Авторизация</h2>
            <small class="subtitle-2 grey--text font-weight-light">Войти в учётную запись</small>
          </v-card-title>
          <v-card-text>
            <v-form ref="loginForm" v-model="loginFormValid" @submit.prevent="">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                type="password"
                v-model="password"
                :rules="passwordRules"
                label="Password"
                required
              ></v-text-field>
              <div class="text-center mt-3">
                <v-btn type="submit" :disabled="!loginFormValid" @click="submit" text outlined color="success">
                  Войти
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
          <v-card-text>
            <v-alert
              :value="alert"
              :type="alertType"
              outlined
              transition="scale-transition"
            >
              {{ alertMessage }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import textFieldRules from '@/helpers/textFieldRules';
  import gql from 'graphql-tag';

  export default {
    name: 'Login',
    data() {
      return {
        alert: false,
        alertType: 'info',
        alertMessage: '',
        loginFormValid: true,
        email: null,
        emailRules: [
          textFieldRules.required,
          textFieldRules.emailValidate
        ],
        password: null,
        passwordRules: [
          textFieldRules.required,
          textFieldRules.counterMin
        ]
      };
    },
    methods: {
      async submit() {
        if (!this.loginFormValid && !this.email && !this.password) {
          return false;
        }

        let result;
        try {
          result = await this.$apollo.query({
            query: gql`${require('@/gql/loginUser.graphql')}`,
            variables: {
              email: this.email,
              password: this.password
            }
          });
        } catch (e) {
          console.log(e);
        }

        if (result.data.loginUser.status === 'success') {
          this.$refs['loginForm'].reset();
          await this.$store.dispatch('user/login', result.data.loginUser.jwt);
          await this.$router.push('admin');
        } else {
          this.alert = true;
          this.alertType = result.data.loginUser.status;
          this.alertMessage = result.data.loginUser.message;
          setTimeout(() => {
            this.alert = false;
          }, 1000 * 5);
        }
      }
    }
  };
</script>

<style scoped>

</style>
