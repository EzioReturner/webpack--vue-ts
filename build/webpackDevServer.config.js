'use strict';

const paths = require('./paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = function(proxy) {
  return {
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    watchContentBase: true,
    hot: true,
    publicPath: '/',
    quiet: true,
    https: protocol === 'https',
    host,
    open: true,
    overlay: false,
    historyApiFallback: {
      disableDotRule: true
    }
  };
};
