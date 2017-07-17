import 'angular';

$(document).ready(function () {

	// var jekyllApp = angular.module('JekyllApp',
	// 	function($interpolateProvider) {
	//     $interpolateProvider.startSymbol('[[{').endSymbol('}]]');
	// });
	// jekyllApp.controller('ContentCtrl', ['$scope', '$http', function($scope, $http) {


	var jekyllApp=angular.module('JekyllApp', []);

	// optim production
	jekyllApp.config(['$compileProvider', function ($compileProvider) {
	  $compileProvider.debugInfoEnabled(false);
	 //  $compileProvider.commentDirectivesEnabled(false);
		// $compileProvider.cssClassDirectivesEnabled(false);
	}]);	

  jekyllApp.controller('ContentCtrl', ['$scope', '$http', function($scope, $http) {

  	// html template
  	var $article= $('article');
  	if (!$article.hasClass('invArticle')) 
  	{
  		$article.addClass('invArticle');
  	}

  	$(".pager .previous a").click(function() {
		    window.location.reload();
		});
		$(".pager .next a").click(function() {
		    window.location.reload();
		});

		var url_list_items = '/clean_agency_demo01/portfolio_articles.json';
		var list_items={};
  	var size_list_items=-1;	


  	$http.get(url_list_items).success(function(response) {

  		list_items = response.list;
  		size_list_items = list_items.length;

  		var hash_prefix = response.config.hash_prefix;
  		var url_page_index = response.config.url_page_index + hash_prefix;
  		

	  	// filtering current url, to extract article
		  var index = window.location.href.lastIndexOf(hash_prefix);
		  if (index>-1) 
		  {
		  	// extract current article
		  	var current_article = null;
		  	var curr_path_article = window.location.href.substr(index+hash_prefix.length);		  	
		  	var index_curr = -1;
		  	for (var i = 0; i < size_list_items; i++) 
		  	{
		  		var path_article_ref=list_items[i].path_folder+'/'+list_items[i].name_id;
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
			  	$http.get(current_article.path_json).success(function(data) {

			  		$('.articleContent').empty();
						$('.articleContent').append(data.post.content);

		  			//update template 
		  		
		  			$('.post-heading .heading').empty();
		  			$('.post-heading .heading').append(current_article.title);

		  			$('.post-heading .subheading').empty();
		  			$('.post-heading .subheading').append(current_article.description);

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
				  		var url_tmp=url_page_index+next_article.path_folder+'/'+next_article.name_id;
				  		$('.pager .next a').attr('href', url_tmp);
				  		$('.pager .next a').attr('title', next_article.title);
				  		$('.pager .next').removeClass('invPager');
				  	}
				  	if (previous_article !== null) 
				  	{
				  		var url_tmp=url_page_index+previous_article.path_folder+'/'+previous_article.name_id;
				  		$('.pager .previous a').attr('href', url_tmp);
				  		$('.pager .previous a').attr('title', previous_article.title);
				  		$('.pager .previous').removeClass('invPager');
				  	}	  
			      
			      $article.removeClass('invArticle');

			    });
			  } // end update content current_article != null
			  else
			  {
			  	$article.removeClass('invArticle');
			  }		
		  }
		  else
		  {
		  	//nothing, default case
		  	$article.removeClass('invArticle');
		  }
		});

    // $http.get('/clean_agency_demo01/posts.json').success(function(data) {
    //   $scope.posts = data.posts;
    // });

  }]);


  jekyllApp.component('greetUser', {
    template: 'Hello, {{$ctrl.user}}!'+' add',
    controller: function GreetUserController() {
      this.user = 'world';
    }
  });

  jekyllApp.component('searchPortfolio', {
    template: 
	    '<div class="row">'+
				'<div class="col-lg-4 col-md-6">'+
					'<p>Search:<input ng-model="$ctrl.query"></p>'+
						'<p>Sort by:'+
						'<select ng-model="$ctrl.orderProp">'+
							'<option value="name">Alphabetical</option>'+
							'<option value="age">Newest</option>'+
						'</select>'+
					'</p>'+
				'</div>'+
		    '<div class="col-lg-8 col-md-6">'+
		    	'<ul class="articles">'+
		    		'<li ng-repeat="article in $ctrl.articles | filter:$ctrl.query | orderBy:$ctrl.orderProp">'+
		    			'<span>{{article.title}}</span>'+
		    		'</li>'+
		      '</ul>'+
		    '</div>'+
		  '</div>',
    controller: ['$http', function PortfolioListController($http) {
      var self = this;
      self.orderProp = 'name';

      $http.get('/clean_agency_demo01/portfolio_articles.json').success(function(response) {
        self.articles = response.list;
      });
    }]
  });
  

});