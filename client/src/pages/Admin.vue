<template>
  <h2>Admin</h2>
</template>

<script>
  import gql from 'graphql-tag';

  export default {
    async beforeMount() {
      const result = await this.$apollo.query({
        client: 'adminClient',
        query: gql`${require('@/gql/root.graphql')}`
      });
      console.log(result);
    },
    name: 'Admin'
  };
</script>

<style scoped>

</style>
