import "angular";
	
	
var jekyllApp=angular.module('JekyllApp', []);

jekyllApp.config(['$compileProvider', '$locationProvider', function ($compileProvider,$locationProvider) {
  // optim production
  $compileProvider.debugInfoEnabled(false);
 	// $compileProvider.commentDirectivesEnabled(false); ko
	// $compileProvider.cssClassDirectivesEnabled(false); ko

	//$location service, keep history browser
	// add <base href="{{page.url}}">, not used on hashbang mode (html5Mode:false) 
	//see > 1.6.0 : default hashbang '!', https://docs.angularjs.org/guide/migration#-location-
	$locationProvider.html5Mode(false).hashPrefix('!');
}]);


jekyllApp.controller('ContentCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

	var url_list_items_ref = BASE_URL+'/portfolio_articles.json';
	var element_ref = 'article';
	var visibility_ref = 'invArticle';

	// html template
	var $article= $(element_ref);
	if (!$article.hasClass(visibility_ref)) 
	{
		$article.addClass(visibility_ref);
	}

	$(".pager .previous a").click(function() {
	    setTimeout(function(){
			  window.location.reload();
			});
	});
	$(".pager .next a").click(function() {
	    setTimeout(function(){
			  window.location.reload();
			});
	});

	window.addEventListener('popstate', function(e) {
	  // pb with firefox, when go-back history, return to index !
	  setTimeout(function(){
		  window.location.reload();
		});		 
	});	

	var list_items={};
	var size_list_items=-1;	


	$http.get(url_list_items_ref).then(function onSuccess(response) {

		let data = response.data;
		list_items = data.list;
		size_list_items = list_items.length;

		var hash_prefix = data.config.hash_prefix;
		var url_page_index = data.config.url_page_index; // + hash_prefix;
		

  	// filtering current url, to extract article
	  // var index = window.location.href.lastIndexOf(hash_prefix);
	  if ($location.path().length>0)
	  {
	  	// extract current article
	  	var current_article = null;
	  	// var curr_path_article = window.location.href.substr(index+hash_prefix.length);		  	
	  	var curr_path_article = $location.path();	  	
	  	var index_curr = -1;
	  	for (var i = 0; i < size_list_items; i++) 
	  	{
	  		var path_article_ref=list_items[i].path_folder+list_items[i].name_id;
	  		if (path_article_ref === curr_path_article) 
	  		{
	  			current_article = list_items[i];
	  			index_curr = i;
	  			break;
	  		}		  		
	  	}

	  	if (current_article !== null) 
	  	{

		  	//update default content with current
		  	$http.get(current_article.path_json).then(function onSuccess(response) {

		  		let data = response.data;

		  		$('.articleContent').empty();
					$('.articleContent').append(data.post.content);

	  			//update template 
	  		
	  			$('.post-heading .heading').empty();
	  			$('.post-heading .heading').append(current_article.title);

	  			$('.post-heading .subheading').empty();
	  			$('.post-heading .subheading').append(current_article.subtitle);

	  			$('.img_header').attr('src', current_article.path_header_img);

	  			$('.meta .date').empty();
	  			$('.meta .date').append(current_article.meta_date);

	  			// update previous next pager
	  			$('.pager .previous').addClass('invPager');
			  	$('.pager .next').addClass('invPager');

	  			var index_pager = index_curr-1;
	  			var next_article = null;
	  			for (var i = index_pager; i >= 0; i--) {
			  		if (list_items[i].path_folder === current_article.path_folder) 
			  		{
			  			next_article = list_items[i];
			  			break;
			  		}		  		
			  	}
			  	var index_pager = index_curr+1;
	  			var previous_article = null;
	  			for (var i = index_pager; i < size_list_items; i++) {
			  		if (list_items[i].path_folder === current_article.path_folder) 
			  		{
			  			previous_article = list_items[i];
			  			break;
			  		}		  		
			  	}
			  	if (next_article !== null) 
			  	{
			  		var url_tmp=url_page_index+hash_prefix+next_article.path_folder+next_article.name_id;
			  		$('.pager .next a').attr('href', url_tmp);
			  		$('.pager .next a').attr('title', next_article.title);
			  		$('.pager .next').removeClass('invPager');
			  	}
			  	if (previous_article !== null) 
			  	{
			  		var url_tmp=url_page_index+hash_prefix+previous_article.path_folder+previous_article.name_id;
			  		$('.pager .previous a').attr('href', url_tmp);
			  		$('.pager .previous a').attr('title', previous_article.title);
			  		$('.pager .previous').removeClass('invPager');
			  	}	  
		      
		      $article.removeClass(visibility_ref);

		    });
		  } // end update content current_article != null
		  else
		  {
		  	$article.removeClass(visibility_ref);
		  }		
	  }
	  else
	  {
	  	//nothing, default case
	  	$article.removeClass(visibility_ref);
	  }
	});

}]);




jekyllApp.component('searchPortfolio', {
	templateUrl: 'templateSearchPortfolio.html',
  controller: ['$http', function PortfolioListController($http) {
    var self = this;
    self.orderProp = '-raw_date'; 

    $http.get(BASE_URL+'/portfolio_articles.json').
    // success(function(response) {
    then(function onSuccess(response){
    	let data = response.data;
      self.articles = data.list;
    });  	

  }]
});

