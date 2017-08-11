


page_site   page_main

coll/site page sit


page detail article : text, video,revealjs,...

blog, portfolio, ...


def template for each


site.data.templates : 

++++++++++++++++++++++

scss : 

	/src/assets/config/common_noncritic.json
		- subfn : 
			/src/_includes/coll_ext/site-config/add-scss/noncritic_template_import.html 
			-> adapted

js : no

++++++++++++++++++++++

/src/assets/config/common_critic.json

scss :

	/src/_includes/coll_ext/site-config/add-scss/critic_template_common_page_site_add_force_custom.html

	- subfn : 
			/src/_includes/coll_ext/site-config/add-scss/critic_template_import_add_force_custom_dbg.html
			-> new version : critic_template_import_add_force_custom_dbg.html
			common_critic_page_site DELETED, adapt templates_new 

js : 
	/src/_includes/coll_ext/site-config/add-html/js_common_import.html 
		-> adapted





++++++++++++++++++++++

/src/assets/config/custom_pages_site.json

scss : 
	- subfn :
		/src/_includes/coll_ext/site-config/add-css/critic_filter.html -> delete
		-> new version : critic_filter_dbg.html

js : 

	-subfn : /src/_includes/coll_ext/site-config/add-html/js.html -> deleted

	-> new version : js_list_import_page.html	

		rem : new fn /src/_includes/coll_ext/site-config/add-html/js_load_script.html, call on layouts