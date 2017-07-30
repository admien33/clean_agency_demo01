## Clean Agency ! 

#### [https://d2m.tech/clean_agency_demo01/](https://d2m.tech/clean_agency_demo01/)

Design from Clean Blog & Agency Themes from Start Bootstrap, editable and extendable, based on Jekyll & Git.


Custom editor on progress; in V1, a VM VirtualBox used locally

Custom libs is required: src/_includes/coll_ext, src/_data/coll_ext



Webpack_assets : optimize scss & js, put on Jekyll src

	first step : generate config_assets files, export info from metadata pages & _data/templates json config

		bundle exec jekyll build --config _config_assets.yml


	second step : build with webpack

		npm install
		npm run build-wp /serve-wp

Then, build jekyll site

	bundle exec jekyll build / serve



First attempts to integrate angularJS on detail items via Webpack

