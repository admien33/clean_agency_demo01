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

const data_dir_jekyll =   config_yml.data_dir || './_data/';
const path_data_custom_assets = config_yml.webpack_assets.path_data_custom_assets || './webpacked_assets/'; 
const json_custom_assets = config_yml.webpack_assets.css.json_custom_assets || 'custom_page_css.json'; 

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


// info empty/add_custom assets critic css
let list_asset_css = {};
let assets_css = fs.readdirSync(path_output_css);
assets_css.forEach ( (asset) => {
	let asset_src = path.resolve(path_output_css,asset);
	const data = fse.readFileSync(asset_src, 'utf8');	
	let index_ext = asset.lastIndexOf('.');
	let asset_name_id = asset.substring(0,index_ext);
	list_asset_css[asset_name_id] = (data.trim() !== '') ? 'add_custom' : 'empty';	
});
const path_json_dir = path.resolve(__dirname,config_source,data_dir_jekyll,path_data_custom_assets);
fse.ensureDirSync(path_json_dir);
const path_json_file = path.resolve(path_json_dir,json_custom_assets);
fse.writeJsonSync(path_json_file, list_asset_css);



fse.moveSync(path_output_js, path_dest_js, { overwrite: true });
fse.moveSync(path_output_css, path_dest_css, { overwrite: true });

let assets_wp = fs.readdirSync(path.resolve(__dirname,path_ouput_wp));
assets_wp.forEach ( (asset) => {
	let asset_src = path.resolve(__dirname,path_ouput_wp,asset);
	let asset_dest = path_dest_js + '/'+ asset;

	fse.moveSync(asset_src, asset_dest, { overwrite: true });
});

fse.removeSync(assets_wp_base);


