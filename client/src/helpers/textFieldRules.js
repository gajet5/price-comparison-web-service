export default {
  required: value => !!value || 'Обязательное поле.',
  emailValidate: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Некоректный E-mail.';
  },
  counterMax: value => {
    if (!value) {
      value = '';
    }
    return value.length <= 20 || 'Максимально 20 символов';
  },
  counterMin: value => {
    if (!value) {
      value = '';
    }
    return value.length >= 3 || 'Минимум 3 символа';
  }
};
