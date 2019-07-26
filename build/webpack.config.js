const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const postcssNormalize = require('postcss-normalize');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
// const notifier = require('node-notifier');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { ProgressPlugin, IgnorePlugin } = webpack;
const paths = require('./paths');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';

module.exports = webpackEnv => {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  const publicPath = './';

  const getStyleLoaders = (cssOption, preProcessor) => {
    const loaders = [
      {
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
        options: {
          sourceMap: isEnvProduction && shouldUseSourceMap
        }
      });
    }
    return loaders;
  };
  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    entry: {
      app: './client/index.ts'
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: publicPath,
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js'
      }
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
        name: false
      },
      runtimeChunk: true
    },
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
                    sourceMap: false,
                    importLoaders: 2,
                    modules: true,
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  })
                },
                {
                  use: getStyleLoaders({
                    sourceMap: false,
                    importLoaders: 2
                  })
                }
              ],
              sideEffects: true
            },
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
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
                      sourceMap: false,
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
                      sourceMap: false,
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
                  importLoaders: 1,
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
                      sourceMap: false,
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
                      sourceMap: false,
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
                  importLoaders: 1,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: true
                },
                'less-loader'
              )
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
    performance: {
      hints: false
    },
    devtool: '#eval-source-map',
    plugins: [
      // make sure to include the plugin for the magic
      new VueLoaderPlugin(),
      new FriendlyErrorsWebpackPlugin({
        // onErrors: (severity, errors) => {
        //   if (severity !== 'error') {
        //     return;
        //   }
        //   const error = errors[0];
        //   notifier.notify({
        //     title: 'webpack error',
        //     message: severity + ': ' + error.name,
        //     subtitle: error.file || ''
        //   });
        // },
        clearConsole: true
      }),
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
      new ProgressPlugin(),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            template: paths.appHtml,
            inject: true
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true
                }
              }
            : undefined
        )
      ),
      new IgnorePlugin(/^\.\/locale$/, /moment$/),
      new ForkTsCheckerWebpackPlugin({
        vue: true,
        tslint: false,
        async: isEnvDevelopment,
        formatter: 'codeframe',
        checkSyntacticErrors: true,
        useTypescriptIncrementalApi: true,
        watch: paths.appSrc,
        tsconfig: paths.appTsConfig
      }),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
        })
    ].filter(Boolean)
  };
};
