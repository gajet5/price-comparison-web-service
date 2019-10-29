const path = require('path');

module.exports = {
  outputDir: path.join(__dirname, '..', 'server', 'public'),
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end();
  }
};
