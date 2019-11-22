import gql from 'graphql-tag';

export default async function(there) {
  try {
    await there.$apollo.query({
      client: 'adminClient',
      query: gql`${require('@/gql/root.graphql')}`
    });
  } catch (e) {
    await there.$store.dispatch('user/logout');
    await there.$router.push('/');
  }
};
