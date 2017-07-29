const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackShellPlugin = require('webpack-shell-plugin');


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const yaml = require('js-yaml');

const config_yml = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));
const config_source = config_yml.source || './src';

const path_ref_js = config_yml.webpack_assets.js.path_ref || './assets_js/';
const dir_app_js = config_yml.webpack_assets.js.dir_app || 'app';
const dir_dist_js = config_yml.webpack_assets.js.dir_dist || 'dist';
const dir_dist_css  = config_yml.webpack_assets.css._assets_dir || 'css';
const _assets_ref_path = config_yml.webpack_assets.css._assets_ref_path || './_assets/';

let path_tmp = path_ref_js + dir_app_js + '/';
const path_app_js = path.resolve(__dirname,config_source,path_tmp);
path_tmp = path_ref_js + dir_dist_js + '/';
const path_dist_js = path.resolve(__dirname,config_source,path_tmp);
path_tmp = config_yml.webpack_assets.css.path_scss || './assets_scss/';
const path_assets_scss = path.resolve(__dirname,config_source,path_tmp);

// let path_tmp = config_yml.webpack_assets.js.path_app || './assets_js/app/';
// const path_app_js = path.resolve(__dirname,config_source,path_tmp);
// path_tmp = config_yml.webpack_assets.js.path_dist || './assets_js/dist/';
// const path_dist_js = path.resolve(__dirname,config_source,path_tmp);
// path_tmp = config_yml.webpack_assets.css.path_scss || './assets_scss/';
// const path_assets_scss = path.resolve(__dirname,config_source,path_tmp);


const assets_yml = yaml.safeLoad(fs.readFileSync('./_config_assets.yml', 'utf8'));
const assets_conf_base = assets_yml.destination || './_site_assets_config';
const assets_conf_path = assets_yml.custom_assets_config.dir || "./assets_config";
const assets_conf_list = assets_yml.custom_assets_config.list;

const assets_wp_base = assets_yml.custom_assets_config.webpack_base_dir || './webpack';
path_tmp = assets_yml.custom_assets_config.webpack_scss_dir || './js';
const assets_wp_scss = path.resolve(__dirname, assets_wp_base,path_tmp);
if (!fs.existsSync(assets_wp_scss)) {
  fs.mkdirSync(assets_wp_scss);
}
path_tmp = assets_yml.custom_assets_config.webpack_js_dir || './scss';
const assets_wp_js = path.resolve(__dirname, assets_wp_base,path_tmp);
if (!fs.existsSync(assets_wp_js)) {
  fs.mkdirSync(assets_wp_js);
}



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const alias_sass_assets = 'alias_sass_assets'; // ~ symbole
const alias_path_template_js = 'alias_path_template_js';

// 'webpack-shell-plugin script
const space = ' ';
const onBuildStart_script = 'rm -rf'+space+config_source+path_ref_js.substr(1)+dir_dist_js;
const onBuildEnd_script = 'mv -f'+space+config_source+_assets_ref_path.substr(1)+dir_dist_js+space+config_source+path_ref_js.substr(1);
// onBuildStart: ['rm -rf ./src/assets_js/dist'],
// onBuildEnd: ['mv -f ./src/_assets/dist ./src/assets_js/'],


const list_entry = {};

//on entry, push default vendor; fixed, could be push on config file
list_entry[dir_dist_js+'/vendor'] = ['jquery','bootstrap'];

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
assets_conf_list.forEach ( asset => {

  let path_asset = path.resolve(__dirname, assets_conf_base, assets_conf_path, asset);
  let content = fs.readFileSync(path_asset, 'utf8');
  let json = JSON.parse(content);
  let var_custom_style = json.config.var_custom_style;
  let delim_import_js = json.config.delim_import_js;

  json.pages.forEach ( page => {
    //asset scss
    let file_scss = path.resolve(assets_wp_scss,'./'+page.id+'.scss'); 
    let list_import_scss = (page.import_scss !== "") ? var_custom_style+page.import_scss : "";   
    fs.writeFileSync(file_scss,JSON.stringify(list_import_scss).replace(/\"/g,''));

    // asset js
    let file_js = path.resolve(assets_wp_js,'./'+page.id+'.js'); 
    let add_asset_css = "require('"+alias_sass_assets+"/"+page.id+".scss');";
    let list_import_js = "";
    if (page.import_js !== "") {
      list_template = page.import_js.split(delim_import_js)
      list_template.forEach ( template => {
        list_import_js+="import '"+alias_path_template_js+"/"+template+"';";
      });
    }    
    fs.writeFileSync(file_js,JSON.stringify(add_asset_css+list_import_js).replace(/\"/g,''));

    //push on entry list
    let path_entry = dir_dist_js+'/'+page.id
    list_entry[path_entry] = file_js;
 });
})
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


const config = {
 
  entry: list_entry,
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname,config_source,_assets_ref_path)    
  },
  module: { 
    loaders: 
    [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },    
      {
        test: /\.scss$/,
        // exclude: /node_modules/, 
        use: ExtractTextPlugin.extract({
          use: 
          [
            {
              loader: "css-loader",
              options: 
              { 
                importLoaders: 2,
                minimize: true || {/* CSSNano Options */}
              }
            },
            { 
              loader: 'postcss-loader', 
              options: {
                plugins: (loader) => [
                  require('autoprefixer')()
                ]
              }
            },
            {
              loader: "sass-loader",
              options: {
                includePaths: [path_assets_scss]
              }
            }
          ]
        })
      }
      // {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      // {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      // {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      // {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
      // {
      //   test: [/MaterialIcons-Regular.eot/, /MaterialIcons-Regular.woff2/, /MaterialIcons-Regular.woff/, /MaterialIcons-Regular.ttf/],
      //   loader: 'file?name=fonts/[name].[ext]'
      // }

    ]
  },
  plugins: [   
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
      BASE_URL: JSON.stringify(config_yml.baseurl || ""),
      JSON_URL_POSTS : JSON.stringify("/posts.json")
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename:  (getPath) => {
        return getPath(dir_dist_css+'/[name].css').replace(dir_dist_css+'/'+dir_dist_js, dir_dist_css);
      },
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: [dir_dist_js+'/common_critic',dir_dist_js+'/vendor'], // vendor, parent of common_critic
      minChunks: 3
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery':'jquery',
      'window.$': 'jquery'
    }),
    new WebpackShellPlugin({
      onBuildStart: [onBuildStart_script],
      onBuildEnd: [onBuildEnd_script],
      // onBuildExit: ['echo "onBuildExit"'],
      safe: true
    })
    
  ],
  // .concat(env === 'production' ? [] : []),
  resolve: {
    alias: {
      alias_path_template_js: path_app_js,
      alias_sass_assets: assets_wp_scss,
      // list import vendor js
      'jquery': path.resolve(path_app_js, './vendor/jquery.2.2.0.min.js'),
      'bootstrap': path.resolve(path_app_js,  './vendor/bootstrap.3.3.7.js'),
      'angular': path.resolve(path_app_js,  './vendor/angular.1.6.4.min.js'),
      // list import plugin js
      'picturefill': path.resolve(path_app_js,  './vendor/picturefill.min.js'),
      'jqBootstrapValidation': path.resolve(path_app_js,  './plugin/jquery.bootstrap-validation.js'),
      'throttle-debounce': path.resolve(path_app_js,  './plugin/jquery.ba-throttle-debounce-wp.js'),
      'easing': path.resolve(path_app_js, './plugin/jquery.easing.1.3.2.js'),
      'scrollspyext': path.resolve(path_app_js,  './plugin/bootstrap.scrollspyext.3.3.7.js')
    }
  }
};


module.exports = config;



//output path,public-path
// https://stackoverflow.com/questions/28846814/what-does-publicpath-in-webpack-do
// case image, cdn,

// publicPath is used by webpack for the replacing relative path defined in your css for refering image and font file. 


// - 'browser-sync-webpack-plugin'
// WebpackShellPlugin

//immages module : 

// {
//     test: /\.(jpe?g|png|gif)$/,
//     use: [
//         { loader: "file-loader?name=[name].[ext]&outputPath=img/" },
//         {
//             loader: 'image-webpack-loader',
//             query: {
//                 progressive: true,
//                 pngquant: {
//                     quality: '65-90',
//                     speed: 4
//                 },
//                 gifsicle: {
//                     interlaced: false
//                 },
//                 // svgo:{},
//                 mozjpeg: {
//                     progressive: true,
//                     optimizationLevel: 7,
//                 }
//             }
//         }
//     ]
// }