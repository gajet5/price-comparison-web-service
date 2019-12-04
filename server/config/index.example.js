module.exports = {
  port: 3000,
  mongodbUrl: '',
  jwt: {
    secret: '',
    expiresIn: '7d'
  },
  scanningFrequency: 1000 * 60 // in milliseconds
};
