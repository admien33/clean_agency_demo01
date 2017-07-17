import 'angular';

$(document).ready(function () {

	
	var jekyllApp=angular.module('JekyllApp', []);

	// optim production
	jekyllApp.config(['$compileProvider', function ($compileProvider) {
	  $compileProvider.debugInfoEnabled(false);
	 //  $compileProvider.commentDirectivesEnabled(false);
		// $compileProvider.cssClassDirectivesEnabled(false);
	}]);	

  jekyllApp.controller('ContentCtrl', ['$scope', '$http', function($scope, $http) {

  	// html template
  	// first hide display, before updating html
  	var $article= $('article');
  	(!$article.hasClass('invArticle')) && $article.addClass('invArticle');  

  	$(".pager .previous a").click(function() {
		    window.location.reload();
		});
		$(".pager .next a").click(function() {
		    window.location.reload();
		});
		window.addEventListener('popstate', function(e) {
		  window.location.reload();
		});	

		var url_list_items = '/clean-agency-demo01/blog_articles.json';
		var list_items={};
  	var size_list_items=-1;	


  	$http.get(url_list_items).success(function(response) {

  		list_items = response.list;
  		size_list_items = list_items.length;

  		var hash_prefix = response.config.hash_prefix;
  		var url_page_index = response.config.url_page_index;  		

	  	// filtering current url, to extract current article
	  	// if none, presentation list
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
				  		var url_tmp=url_page_index+hash_prefix+next_article.path_folder+'/'+next_article.name_id;
				  		$('.pager .next a').attr('href', url_tmp);
				  		$('.pager .next a').attr('title', next_article.title);
				  		$('.pager .next').removeClass('invPager');
				  	}
				  	if (previous_article !== null) 
				  	{
				  		var url_tmp=url_page_index+hash_prefix+previous_article.path_folder+'/'+previous_article.name_id;
				  		$('.pager .previous a').attr('href', url_tmp);
				  		$('.pager .previous a').attr('title', previous_article.title);
				  		$('.pager .previous').removeClass('invPager');
				  	}	  
			      
			      // update visibility
			      ($('article .articleHeader').hasClass('invArticle')) && $('article .articleHeader').removeClass('invArticle');
				  	($('article .articleDetail').hasClass('invArticle')) && $('article .articleDetail').removeClass('invArticle')
				  	$article.removeClass('invArticle');

			    });
			  } // end update content current_article != null
			  else
			  {
			  	//article not found, go-back presentation blog, list articles,..
			  	history.pushState(null, null, url_page_index);
			  	// update visibility
			  	($('article .articleList').hasClass('invArticle')) && $('article .articleList').removeClass('invArticle')
			  	$article.removeClass('invArticle');
			  }		
		  }
		  else
		  {
		  	// no hash prefix on url ,display presentation blog, list articles,..
		  	history.pushState(null, null, url_page_index);
		  	// update visibility
		  	($('article .articleList').hasClass('invArticle')) && $('article .articleList').removeClass('invArticle')		  	
		  	$article.removeClass('invArticle');
		  }
		});

  }]);



	jekyllApp.component('searchBlog', {
		// templateUrl: '/assets-js/template-angular/searchBlog.html',
    template: 
	    '<div class="row">'+
				'<div class="col-lg-12">'+
					'<div class="col-lg-8 col-md-6">'+
						'<p><i class="fa fa-search" aria-hidden="true"></i><input ng-model="$ctrl.query"></p>'+
					'</div>'+
					'<div class="col-lg-4 col-md-6">'+
						'<p>Sort by:'+
							'<select ng-model="$ctrl.orderProp">'+
								'<option value="title">Alphabetical</option>'+
								'<option value="meta_date">Newest</option>'+
							'</select>'+
						'</p>'+
					'</div>'+
				'</div>'+
			'</div>'+
	 
	    '<div class="row" ng-repeat="article in $ctrl.articles | filter:$ctrl.query | orderBy:$ctrl.orderProp">'+
		    '<div class="post-preview">'+
          '<a ng-click="$ctrl.click()" href="{{$ctrl.baseUrl}}{{article.path_folder}}/{{article.name_id}}">'+
            '<h2 class="post-title">'+
              '{{ article.title }}'+
            '</h2>'+
            '<h3 class="post-description">'+
              '{{ article.description }}'+
            '</h3>'+
          '</a>'+
        	'<p class="post-meta">'+
            'Posted on {{ article.meta_date}}'+
          '</p>'+

        '</div>'+
        '<hr>'+
      '</div>',
    controller: ['$http', function BlogListController($http) {
      var self = this;
      self.orderProp = 'meta_date';

			self.click = function(){
			 	window.location.reload();
			}

      $http.get('/clean-agency-demo01/blog_articles.json').success(function(response) {
        self.articles = response.list;
        self.baseUrl = response.config.url_page_index + response.config.hash_prefix;       
      });
    }]
  });

  

});