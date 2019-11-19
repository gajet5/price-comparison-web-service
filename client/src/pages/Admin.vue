<template>
  <h2>Admin</h2>
</template>

<script>
  import gql from 'graphql-tag';

  export default {
    async beforeMount() {
      try {
        const result = await this.$apollo.query({
          client: 'adminClient',
          query: gql`${require('@/gql/root.graphql')}`
        });
        console.log(result);
      } catch (e) {
        console.log(e);
        await this.$store.dispatch('user/logout');
        await this.$router.push('/');
      }
    },
    name: 'Admin'
  };
</script>

<style scoped>

</style>
