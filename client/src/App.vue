<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Сравнение цен</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="login" class="mr-3">
        <v-icon left>mdi-login</v-icon>
        <span>Войти</span>
      </v-btn>
      <v-btn text v-show="canRegistration" to="registration">
        <v-icon left>mdi-account-plus-outline</v-icon>
        <span>Регистрация</span>
      </v-btn>

    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app>
      footer
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {};
    },
    computed: {
      canRegistration() {
        return localStorage.getItem('registration') === 'true';
      }
    }
  };
</script>

<style>

</style>
