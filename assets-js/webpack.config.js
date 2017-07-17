const webpack = require('webpack'); //to access built-in plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const config = {
  // entry: './app/index.js', 
  entry: {
    vendor: ["jquery", "bootstrap"],
    common: "./app/common.js",
    template_default_slider: "./app/template_default_slider.js",
    template_contact_stman_recaptcha: "./app/template_contact_stman_recaptcha.js",
    template_portfolio_angular: "./app/template_portfolio_angular.js",
    template_blog_angular: "./app/template_blog_angular.js",
    template_default_navbar_sections_pages: "./app/template_default_navbar_sections_pages.js"
  },  
  output: {
    // filename: 'index_bundle.js',
    filename: "[name].js",
    path: path.resolve(__dirname, 'dist')
  }, 
  resolve: {
    alias: {
        'jquery': path.resolve(__dirname, 'app/vendor','jquery.2.2.0.min.js'),
        'bootstrap': path.resolve(__dirname, 'app/vendor','bootstrap.3.3.7.js'),
        'angular': path.resolve(__dirname, 'app/vendor','angular.1.5.6.min.js'),
        // 'classie': path.resolve(__dirname, 'app/vendor','classie.js'),
        'picturefill': path.resolve(__dirname, 'app/vendor','picturefill.min.js'),
        'jqBootstrapValidation': path.resolve(__dirname, 'app/plugin','jquery.bootstrap-validation.js'),
        'throttle-debounce': path.resolve(__dirname, 'app/plugin','jquery.ba-throttle-debounce-wp.js'),
        'easing': path.resolve(__dirname, 'app/plugin','jquery.easing.1.3.2.js'),
        'scrollspyext': path.resolve(__dirname, 'app/plugin','bootstrap.scrollspyext.3.3.7.js')
    }
  },
  module: {
    //   rules: [
    //     {test: /\.(js|jsx)$/, use: 'babel-loader'} // need babel-core, todo if needed
    //   ],
    loaders: [
      // {
      //   //https://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack
      //   test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
      //   // Use the imports-loader to configure 'this'
      //   loader: "imports-loader?this=>window"
      //   // Use the imports-loader to disable AMD
      //   loader: "imports-loader?define=>false"
      // },     
      {
        // test: /[\/\\]node_modules[\/\\]jquery[\/\\](src|dist)[\/\\]jquery.+\.(jsx|js)$/, 
        test: /[\/\\]app[\/\\]vendor[\/\\]jquery.+\.(jsx|js)$/,
        loader: 'imports-loader?this=>window' 
      },
      {
        // test: /[\/\\]node_modules[\/\\]bootstrap[\/\\]dist[\/\\]js[\/\\]bootstrap.+\.(jsx|js)$/, 
        test: /[\/\\]app[\/\\]vendor[\/\\]bootstrap.+\.(jsx|js)$/, 
        loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window' 
      },
      // {
      //   test: /[\/\\]app[\/\\]vendor[\/\\]classie.+\.(jsx|js)$/, 
      //   loader: 'imports-loader?this=>window' 
      // },
      {
        test: /[\/\\]app[\/\\]plugin[\/\\]jquery.bootstrap-validation.+\.(jsx|js)$/, 
        loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window' 
      },
      {
        test: /[\/\\]app[\/\\]plugin[\/\\]jquery.ba-throttle-debounce-wp.+\.(jsx|js)$/, 
        loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window' 
      },
      {
        test: /[\/\\]app[\/\\]plugin[\/\\]jquery.easing.+\.(jsx|js)$/, 
        loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window' 
      },
      {
        test: /[\/\\]app[\/\\]plugin[\/\\]bootstrap.scrollspyext.+\.(jsx|js)$/, 
        loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window' 
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader"
        })
      },
      { test: /\.png$/, loader: "file-loader" }

    ]
  },


  plugins: [
    // production optim :
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // }),
    // new webpack.optimize.UglifyJsPlugin(),

    new webpack.ProvidePlugin({   
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "admin-commons",
    //   chunks: ["adminPageA", "adminPageB"]
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      // filename: "vendor.js"
      // (Give the chunk a different name)
      minChunks: Infinity,
      // (with more entries, this ensures that no other module
      //  goes into the vendor chunk)
    })
    // ,
    // new ExtractTextPlugin({
    //   filename: "style_template.css",
    //   allChunks: true
    // })
    
  ]
};


module.exports = config;
