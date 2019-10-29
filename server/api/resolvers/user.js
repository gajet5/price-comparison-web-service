const userModel = require('../../models/users');

module.exports = {
  async createUser({ email, password }) {
    let user;

    try {
      user = await userModel.findOne({
        email
      });
    } catch (e) {
      console.log(e);
      return {
        status: 'error',
        message: 'Ошибка на сервере.'
      };
    }

    if (user) {
      return {
        status: 'warning',
        message: 'Пользователь уже существует.'
      };
    }

    try {
      user = await userModel.create({
        email
      });

      await user.setPassword(password);
      await user.save();

      return {
        status: 'success',
        message: 'Пользователь пользователь успешно создан.'
      };
    } catch (e) {
      await user.remove();
      console.log(e);
      return {
        status: 'error',
        message: 'Ошибка на сервере.'
      };
    }
  }
};
