<template>
  <v-form @submit.prevent="submit" ref="addParseUrlForm">
    <v-card-title>Добавление сайт</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Адресс страницы для парса"
            v-model="url"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-select
            :items="parsers"
            label="Выбрать парсер"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="timesSelected"
            :items="times"
            label="Частота сканирования"
          ></v-select>
        </v-col>
      </v-row>

    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        type="submit"
        color="success"
        text
      >
        Добавить
      </v-btn>
      <v-btn
        @click="clearForm"
        color="error"
        text
      >
        Отмена
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
  import gql from 'graphql-tag';

  export default {
    async beforeMount() {
      let { data: { getParsers: { parsers } } } = await this.$apollo.query({
        client: 'adminClient',
        query: gql`${require('@/gql/getParsers.graphql')}`
      });
      this.parsers = parsers;
    },
    name: 'AddSite',
    data() {
      return {
        url: '',
        timesSelected: null,
        times: [
          {
            text: '1 в неделю',
            value: 1
          }
        ],
        parsers: []
      };
    },
    methods: {
      clearForm() {
        this.$refs.addParseUrlForm.reset();
      },
      submit() {
        console.log(this.url);
      }
    }
  };
</script>

<style scoped>

</style>
