<template>
  <h2>Admin</h2>
</template>

<script>
  export default {
    async beforeMount() {
      await this.$store.dispatch('user/getTokenStatus');
    },
    name: 'Admin'
  };
</script>

<style scoped>

</style>
