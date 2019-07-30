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

const { original } = JSON.parse(process.env.npm_config_argv);
const IsBuildDll = original.pop().indexOf('dll') > -1;

const buildDll = () => {
  return new Promise((resolve, reject) => {
    const _spinner = ora({ color: 'green', text: 'building for dll-vendor...' });
    console.log(1);

    _spinner.start();
    if (!IsBuildDll) {
      _spinner.stop();
      console.log(2);
      resolve();
    } else {
      const dllCompiler = webpack(dllConfig);

      dllCompiler.run((err, stats) => {
        console.log(4);

        err && reject(err);
        _spinner.stop();
        resolve();
        console.log(chalk.cyan('Build dll-vendor done \n'));
      });
    }
  });
};

//构建全量压缩包！
rm(rmFile, function(err) {
  if (err) throw err;

  buildDll()
    .then(res => {
      console.log(3);

      spinner.start();
      const config = configFactory('production');
      const compiler = webpack(config);
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
    })
    .catch(err => {
      if (err) throw err;
    });
});
