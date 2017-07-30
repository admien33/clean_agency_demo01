const path = require('path');
const fs = require('fs');
const fse = require('fs-extra')
const yaml = require('js-yaml');

const config_yml = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));

const config_source = config_yml.source || './src';
const config_path_output_js = config_yml.webpack_assets.js.path_output || './assets/';
const output_dir_js = config_yml.webpack_assets.js.output_dir || 'dist';
const output_dir_css  = config_yml.webpack_assets.css.assets_ouput || 'css_wp';

const _assets_ref_path = config_yml.webpack_assets._assets_ref_path || './_assets/';

//++++++

const assets_yml = yaml.safeLoad(fs.readFileSync('./_config_assets.yml', 'utf8'));

let path_tmp = assets_yml.custom_assets_config.webpack_base_path || './webpack/';
const assets_wp_base = path.resolve(__dirname, path_tmp);

const path_ouput_wp = assets_yml.custom_assets_config.webpack_output_path || './webpack/ouput/assets/';

path_tmp = path_ouput_wp + output_dir_js;
const path_output_js = path.resolve(__dirname,path_tmp);

path_tmp = path_ouput_wp + output_dir_css;
const path_output_css = path.resolve(__dirname,path_tmp);

path_tmp = config_path_output_js + output_dir_js;
const path_dest_js = path.resolve(__dirname,config_source,path_tmp);

path_tmp = _assets_ref_path + output_dir_css;
const path_dest_css = path.resolve(__dirname,config_source,path_tmp);


fse.moveSync(path_output_js, path_dest_js, { overwrite: true });
fse.moveSync(path_output_css, path_dest_css, { overwrite: true });

let assets_wp = fs.readdirSync(path.resolve(__dirname,path_ouput_wp));
assets_wp.forEach ( (asset) => {
	let asset_src = path.resolve(__dirname,path_ouput_wp,asset);
	let asset_dest = path_dest_js + '/'+ asset;

	fse.moveSync(asset_src, asset_dest, { overwrite: true });
});

fse.removeSync(assets_wp_base);


