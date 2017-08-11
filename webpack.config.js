const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const yaml = require('js-yaml');


const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackShellPlugin = require('webpack-shell-plugin');

const sep_path = '/';


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


const config_yml = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));

const config_source = config_yml.source || './src';
const config_hosturl = config_yml.url || "";
const config_baseurl = config_yml.baseurl || "";
const config_staticman_url = config_yml.staticman.url || "";

const config_path_input_js = config_yml.webpack_assets.js.path_input || './assets/js/';
const config_path_output_js = config_yml.webpack_assets.js.path_output || './assets/';
const input_dir_js = config_yml.webpack_assets.js.input_dir || '';
const output_dir_js = config_yml.webpack_assets.js.output_dir || 'dist';
const path_components_js = config_yml.webpack_assets.js.path_components || './components/';
const output_dir_css  = config_yml.webpack_assets.css.assets_ouput || 'css_wp';

let path_tmp = config_path_input_js + input_dir_js;
if (input_dir_js !== '') {path_tmp+=sep_path;}
const path_input_js = path.resolve(__dirname,config_source,path_tmp);

const path_ref_components = path.resolve(path_input_js,path_components_js);

path_tmp = config_yml.webpack_assets.css.path_input || './assets/scss/';
const path_assets_scss = path.resolve(__dirname,config_source,path_tmp);

path_tmp = config_yml.webpack_assets.images.path_input || './assets/images/';
const path_ref_img = path.resolve(__dirname,config_source,path_tmp);

path_tmp = config_yml.webpack_assets.fonts.path_input || './assets/fonts/';
const path_ref_font = path.resolve(__dirname,config_source,path_tmp);

// +++++++++

const assets_yml = yaml.safeLoad(fs.readFileSync('./_config_assets.yml', 'utf8'));

const assets_conf_base = assets_yml.destination || './_site_assets_config';
const assets_conf_path = assets_yml.custom_assets_config.dir || "./assets/config";
const assets_conf_list = assets_yml.custom_assets_config.list;

path_tmp = assets_yml.custom_assets_config.webpack_base_path || './webpack/';
const assets_wp_base = path.resolve(__dirname, path_tmp);

path_tmp = assets_yml.custom_assets_config.webpack_output_path || './webpack/ouput/assets/';
const assets_wp_ouput = path.resolve(__dirname, path_tmp);

fse.removeSync(assets_wp_base);
fse.ensureDirSync(assets_wp_ouput);




//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const alias_sass_assets = 'alias_sass_assets';
const alias_path_template_js = 'alias_path_template_js';


const list_entry = {};

//on entry, push default vendor; fixed, could be push on config file
list_entry[output_dir_js+'/vendor'] = ['jquery','bootstrap','angular'];

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
assets_conf_list.forEach ( asset => {

  let path_asset = path.resolve(__dirname, assets_conf_base, assets_conf_path, asset);
  let content = fs.readFileSync(path_asset, 'utf8');
  let json = JSON.parse(content);
  let var_custom_style = json.config.var_custom_style;
  let delim_import_js = json.config.delim_import_js;

  json.pages.forEach ( page => {
    //asset scss
    let file_scss = path.resolve(assets_wp_base,'./'+page.id+'.scss'); 
    let list_import_scss = (page.import_scss !== "") ? var_custom_style+page.import_scss : "";   
    fs.writeFileSync(file_scss,JSON.stringify(list_import_scss).replace(/\"/g,''));

    // asset js
    let file_js = path.resolve(assets_wp_base,'./'+page.id+'.js'); 
    let add_asset_css = "require('"+alias_sass_assets+sep_path+page.id+".scss');";
    let list_import_js = "";
    if (page.import_js !== "") {
      list_template = page.import_js.split(delim_import_js)
      list_template.forEach ( template => {
        list_import_js+="import '"+alias_path_template_js+sep_path+template+"';";
      });
    }    
    fs.writeFileSync(file_js,JSON.stringify(add_asset_css+list_import_js).replace(/\"/g,''));

    //push on entry list
    let path_entry = output_dir_js+sep_path+page.id
    list_entry[path_entry] = file_js;
 });
})

// asset images, used on css
fse.copySync(path_ref_img, assets_wp_base)
// asset fonts, used on css
fse.copySync(path_ref_font, assets_wp_base)

//asset components, used on js, put on specific folder 
fse.copySync(path_ref_components, path.resolve(assets_wp_base, path_components_js) )

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



const config = {
 
  entry: list_entry,
  output: {
    filename: "[name].js",
    publicPath: config_baseurl + config_path_output_js.substr(1) + output_dir_js + sep_path,
    path: path.resolve(__dirname,config_source,assets_wp_ouput)
    
  },
  module: { 
    rules: 
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
      },
      {
        test: /\.(png|jpg|gif)$/, loader: 'url-loader',
        options: {limit: 8192}
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader',
        options: {limit: 10000, mimetype: 'image/svg+xml'}
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader',
        options: {limit: 10000, mimetype: 'application/font-woff'}
      },     
      {
        test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader',
        options: {limit: 10000, mimetype: 'application/octet-stream'}
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader',
        options: {limit: 10000, mimetype: 'application/vnd.ms-fontobject'}
      }
    ]
   
  },
  plugins: [   
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
      HOST_URL: JSON.stringify(config_hosturl),
      BASE_URL: JSON.stringify(config_baseurl),
      STATICMAN_URL: JSON.stringify(config_staticman_url),
      JSON_URL_POSTS: JSON.stringify("/posts.json")
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename:  (getPath) => {
        return getPath(output_dir_css+'/[name].css').replace(output_dir_css+sep_path+output_dir_js, output_dir_css);
      },
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: [output_dir_js+'/common_critic',output_dir_js+'/vendor'], // vendor, parent of common_critic
      minChunks: 3
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery':'jquery',
      'window.$': 'jquery'
    }),
    new WebpackShellPlugin({
      onBuildEnd: ['node webpack.postprocess.js'],      
      safe: true
    })
    
  ],
  // .concat(env === 'production' ? [] : []),
  resolve: {
    alias: {
      alias_path_template_js: path_input_js,
      // alias_sass_assets: assets_wp_scss,
      alias_sass_assets: assets_wp_base,
      // list import vendor js
      'jquery': path.resolve(path_input_js, './vendor/jquery.2.2.0.min.js'),
      'bootstrap': path.resolve(path_input_js,  './vendor/bootstrap.3.3.7.js'),
      'angular': path.resolve(path_input_js,  './vendor/angular.1.6.4.min.js'),
      // list import plugin js
      'picturefill': path.resolve(path_input_js,  './vendor/picturefill.min.js'),
      'jqBootstrapValidation': path.resolve(path_input_js,  './plugin/jquery.bootstrap-validation.js'),
      'throttle-debounce': path.resolve(path_input_js,  './plugin/jquery.ba-throttle-debounce-wp.js'),
      'easing': path.resolve(path_input_js, './plugin/jquery.easing.1.3.2.js'),
      'scrollspyext': path.resolve(path_input_js,  './plugin/bootstrap.scrollspyext.3.3.7.js')
    }
  }
};


module.exports = config;


// +++++++++++++++++++++++++++++++++++++++++++++++++
// https://github.com/borodean/postcss-assets
// integration 'postcss-assets', todo evaluate
// plugin called on 'postcss-loader'  : 
        // options: {
        //   plugins: (loader) => [
        //     require('postcss-assets')({
        //       // to evaluate, need post-css 5.2.0 + add calipers, calipers-png, ...
        //       //  loadPaths: ['src/assets_image/']
        //     }),
        //     require('autoprefixer')()
        //   ]
        // }
// on package json, add:
// "postcss": "^5.2.0", // ! pb v >= 6
// "postcss-assets": "^4.2.0",
// "calipers": "^2.0.0",
// "calipers-gif": "^2.0.0",
// "calipers-jpeg": "^2.0.0",
// "calipers-png": "^2.0.0",

// +++++++++++++++++++++++++++++++++++++++++++++++++
// "react": "^15.6.1",
// "react-addons-update": "^15.6.0",
// "react-dom": "^15.6.1",






//compress images assets : 

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


// package json
 
    