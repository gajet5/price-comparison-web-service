<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col md="6">
        <v-card>
          <v-card-title class="d-flex flex-column justify-start align-start">
            <h2>Регистрация</h2>
            <small class="subtitle-2 grey--text font-weight-light">Добавление административной учётной записи</small>
          </v-card-title>
          <v-card-text>
            <v-form ref="registrationForm" v-model="registrationFormValid">
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
              <v-text-field
                type="password"
                v-model="rePassword"
                :rules="rePasswordRules"
                label="Re-password"
                required
              ></v-text-field>
              <div class="text-center mt-3">
                <v-btn :disabled="!registrationFormValid" @click="submit" text outlined color="success">
                  Зарегистрироваться
                </v-btn>
              </div>
            </v-form>
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
    name: 'Registration',
    data() {
      return {
        registrationFormValid: true,
        email: null,
        emailRules: [
          textFieldRules.required,
          textFieldRules.emailValidate
        ],
        password: null,
        passwordRules: [
          textFieldRules.required,
          textFieldRules.counterMin,
          password => password === this.rePassword || 'Пароли должны совпадать.'
        ],
        rePassword: null,
        rePasswordRules: [
          textFieldRules.required,
          textFieldRules.counterMin,
          rePassword => rePassword === this.password || 'Пароли должны совпадать.'
        ]
      };
    },
    watch: {
      password() {
        this.passwordMatching();
      },
      rePassword() {
        this.passwordMatching();
      }
    },
    methods: {
      passwordMatching() {
        if (!this.password || !this.rePassword) {
          return false;
        }
        this.$refs['registrationForm'].validate();
      },
      async submit() {
        let result;

        try {
          result = await this.$apollo.mutate({
            mutation: gql`${require('@/gql/createUser.graphql')}`,
            variables: {
              email: this.email,
              password: this.password
            }
          });
        } catch (e) {
          console.log(e);
        }

        if (result.data.createUser.status === 'success') {
          this.$refs['registrationForm'].reset();
          await this.$store.dispatch('user/saveToken', result.data.createUser.jwt);
        } else {
          console.log(result.data);
        }
      }
    }
  };
</script>

<style scoped>

</style>
