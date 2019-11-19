<template>
  <v-app>
    <header-component></header-component>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app>
      footer
    </v-footer>
  </v-app>
</template>

<script>
  import HeaderComponent from '@/components/Header';

  export default {
    name: 'App',
    components: {
      HeaderComponent
    },
    data() {
      return {};
    }
  };
</script>

<style>

</style>
