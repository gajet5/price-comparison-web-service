<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
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

  export default {
    async beforeMount() {
      await checkUserAuth(this);
    },
    name: 'Admin',
    data() {
      return {
        url: '',
        times: [
          {
            text: '1 день',
            value: 1
          },
          {
            text: '3 день',
            value: 3
          },
          {
            text: '5 день',
            value: 5
          }
        ],
        parsers: ['re-store.ru', 'apple.com', 'some-apple.net']
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
