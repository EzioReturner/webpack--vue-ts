'use strict';
//node for loading
const ora = require('ora');
// rm-rf for node
const rm = require('rimraf');
//console for node
const chalk = require('chalk');
//path for node
const path = require('path');
//webpack
const webpack = require('webpack');
//webpack production setting
const configFactory = require('../build/webpack.config');

const dllConfig = require('../build/webpack.dll');

const rmFile = path.resolve(__dirname, '../build/dist');
//build start loading
const spinner = ora({ color: 'green', text: 'building for production...' });

const config = configFactory('production');

const { original } = JSON.parse(process.env.npm_config_argv);
const IsBuildDll = original.pop().indexOf('dll') > -1;

//构建全量压缩包！
rm(rmFile, function(err) {
  if (err) throw err;

  const compiler = webpack(config);

  const dllCompiler = webpack(dllConfig);

  if (IsBuildDll) {
    const _spinner = ora({ color: 'green', text: 'building for dll-vendor...' });
    _spinner.start();
    dllCompiler.run((err, stats) => {
      _spinner.stop();
      console.log(chalk.cyan('  Build dll-vendor.\n'));
    });
  }
  spinner.start();

  compiler.run((err, stats) => {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    );

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('  Build complete.\n'));
  });
});
