'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
  throw err;
});

const fs = require('fs');
const chalk = require('chalk');
const paths = require('../build/paths');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('./utils/clearConsole');
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('./utils/WebpackDevServerUtils');
const webpackConfigFactory = require('../build/webpack.config');
const createDevServerConfig = require('../build/webpackDevServer.config');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 9528;
const HOST = process.env.HOST || '0.0.0.0';

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  );
  console.log(`If this was unintentional, check that you haven't mistakenly set it in your shell.`);
  console.log(`Learn more here: ${chalk.yellow('https://bit.ly/CRA-advanced-config')}`);
  console.log();
}

(function startClient() {
  console.log(1);
})();
