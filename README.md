## Clean Agency ! 

#### [https://d2m.tech/clean_agency_demo01/](https://d2m.tech/clean_agency_demo01/)

Design from Clean Blog & Agency Themes from Start Bootstrap, editable and extendable, based on Jekyll & Git.


Custom editor on progress : update github server on localhost; in V1, via VM VirtualBox

Custom libs is required: src/_includes/coll_ext, src/_data/coll_ext



### Webpack_assets put on Jekyll src

	first step : generate config_assets files, export info from metadata pages & _data/templates json config

		bundle exec jekyll build --config _config_assets.yml


	second step : build with webpack

		npm install
		npm run build-wp /serve-wp


todo : 
	
	- add hash on assets js + list hashed filenames used during jekyll build



### Then, build jekyll site

	bundle exec jekyll build / serve



#### Info build time site end-user :

 - intel I5-4210U 1.7Ghz

 - Jekyll with assets plugin only : ~16s

 - Jekyll with webpack + assets plugin  : ~4.5s
 
  ( webpack assets build offline : ~ 20s)



#### AngularJS on detail articles portfolio, and blog page



