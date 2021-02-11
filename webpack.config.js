const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// module.exports node.js feature for exporting and later importing functionality on different .js files
// here is unnamed function export witch return object for webpack
const createConfig = (env) => {
  const isProd = env.production

  const plugins = [];
  if (isProd) {
    // enable in production only
    plugins.push(new MiniCssExtractPlugin({ filename: 'styles.css' }));
  }

  return {
    //entry declares entry point of application where webpack looks to start building the bundle(here is a single entry index.js, but maybe more entries like app.js, adminApp.js and so on)
    // babel-polyfill Provides polyfills necessary for a full ES2015+ environment (includes features witch older browser does not support)
    // index.js is entry point for application
    // babel-polyfill and index.js are combine in single chunk (with name "main")
    entry: ['@babel/polyfill', './src/index.js'],
    // output instructing webpack on how and where it should output your bundles, assets and anything else you bundle or load with webpack
    output: {
      path: path.resolve(__dirname, 'public/dist'),
      filename: 'bundle.js'
    },
    // module determines how the different types of modules within a project will be treated.
    module: {
      // An array of Rules which are matched to requests when modules are created. These rules can modify how the module is created. They can apply loaders to the module, or modify the parser.
      rules: [
        // 1. rule witch transpile all js modules with babel-loader 
        {
          // Include all modules that pass test assertion
          test: /\.js$/,
          // Exclude all modules matching any of these conditions
          exclude: /node_modules/,
          //Include all modules matching any of these conditions
          //include:
          use: {
            // loader with transpile code to older syntax
            loader: 'babel-loader',
            // options witch are required to babel-loader to transpile
            options: {
              // presets are collections of plugins for code transpilation
              // env preset is for ES6 standard transpialtion
              // react preset is jsx transpilation to JS
              presets: ['@babel/react', '@babel/env'],
              // plugins are single feater libs for code tanspilation
              // transform-object-rest-spread allows Babel to transform rest properties for object destructuring assignment and spread properties for object literals
              // transform-class-properties transforms es2015 static class properties as well as properties declared with the es2016 property initializer syntax
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-class-properties'
              ]
            }
          }
        }, {
          test: /\.s?css$/,
          use: [
            //MiniCssExtractPlugin extract css from bundle.js
            //style-loader inject CSS into the DOM
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            //The css-loader interprets @import and url() like import/require() and will resolve them.
            //url=false compilation error cannot resolve image during compilation
            'css-loader?url=false',
            //load Sass and Scss files and compile it to css files
            'sass-loader'
          ]
        }]
    },
    plugins,
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/',
      port: 8082,
      proxy: {
        // when a requst to /api is done, we want to apply a proxy
        '/api': {
          changeOrigin: true,
          secure: false,
          logLevel: 'debug',
          target: 'http://alpha-meme-maker.herokuapp.com',
          pathRewrite: { '^/api': '' },
        }
      }
    },
    // This option controls if and how source maps are generated
    devtool: isProd ? 'source-map' : 'inline-source-map'
  }
}

module.exports = (env) => {
  const mainConfig = createConfig(env)
  return mainConfig
} 