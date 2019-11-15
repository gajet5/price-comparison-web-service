const jsonwebtoken = require('jsonwebtoken');
const userModel = require('../../models/users');
const { jwt } = require('../../config');

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
        message: 'Пользователь успешно создан.',
        jwt: jsonwebtoken.sign({ id: user.id }, jwt.secret, { expiresIn: jwt.expiresIn })
      };
    } catch (e) {
      await user.remove();
      console.log(e);
      return {
        status: 'error',
        message: 'Ошибка на сервере.'
      };
    }
  },

  async loginUser({ email, password }) {
    let user;

    try {
      user = await userModel.findOne({ email });
    } catch (e) {
      console.log(e);
      return {
        status: 'error',
        message: 'Ошибка на сервере.'
      };
    }

    if (!user) {
      return {
        status: 'warning',
        message: 'Пользователь не найден.'
      };
    }

    if (!await user.validatePassword(password)) {
      return {
        status: 'error',
        message: 'Неверный пароль.'
      };
    }

    return {
      status: 'success',
      message: 'Пользователь найден.',
      jwt: jsonwebtoken.sign({ id: user.id }, jwt.secret, { expiresIn: jwt.expiresIn })
    };
  },

  async tokenValidate({ token }) {
    const result = jsonwebtoken.verify(token, jwt.secret);
    console.log(result);
    return {
      status: 'test',
      message: 'Some messages'
    };
  }
};
