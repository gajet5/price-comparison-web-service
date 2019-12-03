<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <add-site></add-site>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Таблица с парсерами и статус по ним in dev
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import checkUserAuth from '@/helpers/checkUserAuth';
  import AddSite from '@/components/Admin/AddSite';

  export default {
    async beforeMount() {
      await checkUserAuth(this);
    },
    name: 'Admin',
    components: {
      AddSite
    },
    data() {
      return {};
    },
    methods: {

    }
  };
</script>

<style scoped>

</style>
