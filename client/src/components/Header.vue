<template>
  <v-app-bar app>
    <v-toolbar-title>Сравнение цен</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="login" class="mr-3" v-if="btnSignInBehavior">
      <v-icon left>mdi-login</v-icon>
      <span>Войти</span>
    </v-btn>
    <v-btn text @click="logout" class="mr-3" v-else>
      <v-icon left>mdi-exit-to-app</v-icon>
      <span>Выйти</span>
    </v-btn>
    <v-btn text v-show="canRegistration" to="registration">
      <v-icon left>mdi-account-plus-outline</v-icon>
      <span>Регистрация</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'Header',
    computed: {
      btnSignInBehavior() {
        return !this.$store.getters['user/loggedIn'];
      },
      canRegistration() {
        return localStorage.getItem('registration') === 'true';
      }
    },
    methods: {
      async logout() {
        await this.$store.dispatch('user/logout');
        await this.$router.push('/');
      }
    }
  };
</script>

<style scoped>

</style>
