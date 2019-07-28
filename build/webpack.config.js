'use strict';
const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const { ProgressPlugin, IgnorePlugin, NamedModulesPlugin, DefinePlugin } = webpack;
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const postcssNormalize = require('postcss-normalize');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
// const CompressionPlugin = require('compression-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const PORT = parseInt(process.env.PORT, 10) || 9528;
const HOST = process.env.HOST || '0.0.0.0';

const paths = require('./paths');

const IsAnalyze = process.argv.pop().indexOf('analyze') > -1;

//拼接路径
function resolve(track) {
  return path.join(__dirname, '..', track);
}

module.exports = webpackEnv => {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  const publicPath = './';

  const getStyleLoaders = (cssOption, preProcessor) => {
    const loaders = [
      isEnvDevelopment && {
        loader: require.resolve('vue-style-loader'),
        options: {
          sourceMap: false,
          shadowMode: false
        }
      },
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: publicPath === './' ? { publicPath: '../../' } : {}
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOption
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          sourceMap: isEnvProduction && shouldUseSourceMap,
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009'
              },
              stage: 3
            }),
            postcssNormalize()
          ]
        }
      }
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: Object.assign(
          {},
          {
            sourceMap: isEnvProduction && shouldUseSourceMap
          },
          preProcessor === 'less-loader'
            ? {
                javascriptEnabled: true
              }
            : undefined
        )
      });
    }
    return loaders;
  };
  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    entry: path.resolve(__dirname, '../client/main.js'),
    resolve: {
      // import hello from './hello'  （!hello.js? -> !hello.vue? -> !hello.json）
      extensions: ['.ts', '.js', '.vue', '.tsx', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('./client'),
        '@components': resolve('./client/components'),
        '@styles': resolve('./client/styles'),
        '@utils': resolve('./client/utils'),
        '@views': resolve('./client/views'),
        '@constants': resolve('./client/constants'),
        '@config': resolve('./client/config'),
        '@model': resolve('./client/model')
      }
    },
    output: {
      publicPath: './',
      path: path.resolve(__dirname, '../build/dist'),
      //文件名
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/bundle.js',
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js'
    },
    devtool: isEnvDevelopment ? 'cheap-module-eval-source-map' : false,
    module: {
      rules: [
        // Disable require.ensure as it's not a standard language feature.
        { parser: { requireEnsure: false } },
        // First, run the linter.
        // It's important to do this before Babel processes the JS.
        {
          enforce: 'pre',
          test: /\.(vue|(j|t)sx?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'eslint-loader',
              options: {
                extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx'],
                emitWarning: true,
                emitError: true
              }
            }
          ]
        },
        /* config.module.rule('vue') */
        {
          test: /\.vue$/,
          use: [
            'cache-loader',
            {
              loader: 'vue-loader',
              options: {
                compilerOptions: {
                  preserveWhitespace: false
                }
              }
            }
          ]
        },
        {
          oneOf: [
            {
              test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
              use: [
                /* config.module.rule('images').use('url-loader') */
                {
                  loader: 'url-loader',
                  options: {
                    limit: 4096,
                    fallback: {
                      loader: 'file-loader',
                      options: {
                        name: 'static/img/[name].[hash:8].[ext]'
                      }
                    }
                  }
                }
              ]
            },
            /* config.module.rule('svg') */
            {
              test: /\.(svg)(\?.*)?$/,
              use: [
                /* config.module.rule('svg').use('file-loader') */
                {
                  loader: 'file-loader',
                  options: {
                    name: 'static/img/[name].[hash:8].[ext]'
                  }
                }
              ]
            },
            /* config.module.rule('media') */
            {
              test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
              use: [
                /* config.module.rule('media').use('url-loader') */
                {
                  loader: 'url-loader',
                  options: {
                    limit: 4096,
                    fallback: {
                      loader: 'file-loader',
                      options: {
                        name: 'static/media/[name].[hash:8].[ext]'
                      }
                    }
                  }
                }
              ]
            },
            /* config.module.rule('fonts') */
            {
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
              use: [
                /* config.module.rule('fonts').use('url-loader') */
                {
                  loader: 'url-loader',
                  options: {
                    limit: 4096,
                    fallback: {
                      loader: 'file-loader',
                      options: {
                        name: 'static/fonts/[name].[hash:8].[ext]'
                      }
                    }
                  }
                }
              ]
            },

            /* config.module.rule('css') */
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              oneOf: [
                {
                  resourceQuery: /module/,
                  use: getStyleLoaders({
                    sourceMap: isEnvProduction && shouldUseSourceMap,
                    importLoaders: 2,
                    modules: true,
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  })
                },
                {
                  use: getStyleLoaders({
                    sourceMap: isEnvProduction && shouldUseSourceMap,
                    importLoaders: 2
                  })
                }
              ],
              sideEffects: true
            },
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 2,
                sourceMap: isEnvProduction && shouldUseSourceMap,
                modules: true
              })
            },
            /* config.module.rule('scss|sass') */
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              oneOf: [
                {
                  resourceQuery: /module/,
                  use: getStyleLoaders(
                    {
                      sourceMap: isEnvProduction && shouldUseSourceMap,
                      importLoaders: 2,
                      modules: true,
                      localIdentName: '[name]_[local]_[hash:base64:5]'
                    },
                    'sass-loader'
                  )
                },
                {
                  use: getStyleLoaders(
                    {
                      sourceMap: isEnvProduction && shouldUseSourceMap,
                      importLoaders: 2
                    },
                    'sass-loader'
                  )
                }
              ],
              sideEffects: true
            },
            {
              test: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: true
                },
                'sass-loader'
              )
            },
            /* config.module.rule('less') */
            {
              test: lessRegex,
              exclude: lessModuleRegex,
              oneOf: [
                {
                  resourceQuery: /module/,
                  use: getStyleLoaders(
                    {
                      sourceMap: isEnvProduction && shouldUseSourceMap,
                      importLoaders: 2,
                      modules: true,
                      localIdentName: '[name]_[local]_[hash:base64:5]'
                    },
                    'less-loader'
                  )
                },
                {
                  use: getStyleLoaders(
                    {
                      sourceMap: isEnvProduction && shouldUseSourceMap,
                      importLoaders: 2
                    },
                    'less-loader'
                  )
                }
              ],
              sideEffects: true
            },
            {
              test: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: true
                },
                'less-loader'
              )
            },
            {
              test: /\.jsx$/,
              loader: 'babel-loader',
              exclude: /(node_modules)/
            },
            {
              test: /\.js$/,
              use: {
                loader: 'babel-loader'
              },
              include: resolve('client')
            },
            {
              test: /\.ts$/,
              exclude: /node_modules/,
              use: [
                'cache-loader',
                'babel-loader',
                {
                  loader: 'ts-loader',
                  options: {
                    transpileOnly: true,
                    happyPackMode: false,
                    appendTsSuffixTo: [/\.vue$/]
                  }
                }
              ]
            },
            {
              test: /\.tsx$/,
              exclude: /node_modules/,
              use: [
                'cache-loader',
                'babel-loader',
                {
                  loader: 'ts-loader',
                  options: {
                    transpileOnly: true,
                    happyPackMode: false,
                    appendTsxSuffixTo: [/\.vue$/]
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          },
          cache: true,
          sourceMap: shouldUseSourceMap,
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: shouldUseSourceMap
              ? {
                  // `inline: false` forces the sourcemap to be output into a
                  // separate file
                  inline: false,
                  // `annotation: true` appends the sourceMappingURL to the end of
                  // the css file, helping the browser find the sourcemap
                  annotation: true
                }
              : false
          }
        })
      ],
      splitChunks: {
        chunks: 'all',
        name: true,
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`;
            }
          }
        }
      },
      runtimeChunk: true
    },
    plugins: [
      new VueLoaderPlugin(),

      // show rate of progress
      new ProgressPlugin(),

      // relative path
      new NamedModulesPlugin(),

      // enable this plugin it would not quit program when webpack build failed
      // new webpack.NoEmitOnErrorsPlugin(),

      // html entry plugin
      new HtmlWebpackPlugin({
        title: 'Luckyue',
        filename: 'index.html',
        template: resolve('public/index.html'),
        inject: true
      }),

      // module files mapping
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: publicPath,
        generate: (seed, files) => {
          const manifestFiles = files.reduce(function(manifest, file) {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);

          return {
            files: manifestFiles
          };
        }
      }),

      // // css minimized
      isEnvProduction &&
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
        }),

      new ForkTsCheckerWebpackPlugin({
        vue: true,
        tslint: false,
        formatter: 'codeframe',
        checkSyntacticErrors: false
      }),

      // compile info plugin
      isEnvDevelopment &&
        new FriendlyErrorsPlugin({
          // compile success info setting
          compilationSuccessInfo: {
            messages: [
              `Your application is running at:` +
                '\n\n' +
                `\t- Local:   ${chalk.cyan(`http://localhost:${PORT}`)}  \n` +
                `\t- Network: ${chalk.cyan(`http://${HOST}:${PORT}`)} \n`
            ]
          },
          // when compile error
          onErrors: function(severity, errors) {
            if (severity !== 'error') {
              return;
            }
            const error = errors[0];
            const filename = error.file.split('!').pop();
            // error notifier
            notifier.notify({
              title: 'Luckyue',
              message: severity + ': ' + error.name,
              subtitle: filename || '',
              icon: path.join(__dirname, 'luckyue.png')
            });
          }
        }),

      IsAnalyze &&
        isEnvProduction &&
        new BundleAnalyzerPlugin({
          analyzerPort: 8889
        })
      // // gzip
      // isEnvProduction &&
      //   new CompressionPlugin({
      //     test: /\.js$|\.html$|.\css/,
      //     threshold: 10240,
      //     deleteOriginalAssets: false
      //   }),
    ].filter(Boolean)
  };
};
