
import 'angular';
import 'angular-ui-router';
import 'angular-sanitize';


import {articles} from "./components/blog.articles";
import {detail} from "./components/blog.detail";
import {BlogService} from "./components/blog.service";



var jekyllApp = angular.module('JekyllApp', ['ui.router','ngSanitize']);



jekyllApp.config(['$compileProvider', '$locationProvider', '$stateProvider', '$urlServiceProvider', '$provide', 
	function ($compileProvider, $locationProvider, $stateProvider, $urlServiceProvider, $provide) {

  // optim production
  $compileProvider.debugInfoEnabled(false);
 
	//$location service, keep history browser
	//see > 1.6.0 : default hashbang '!', https://docs.angularjs.org/guide/migration#-location-
  // default hashbang mode used, V1;  jekyll need permalink /blog/index.html; but in html5 mode, index.html is filtering, todo eval with rewrite url 
	$locationProvider.html5Mode(false).hashPrefix('!');

	$provide.service('BlogService', BlogService); 
	

	// An array of state definitions
  var states = [	
    { 
      name: 'articles', url: '/articles', component: 'articles',
      resolve: {
        articles: ['BlogService',function(BlogService) {
          return BlogService.getAllArticles();
        }],
        config: ['BlogService',function(BlogService) {
         return BlogService.getConfig();
        }]
      }
    },
    { 
      name: 'detail', url: '/{_articleUrl:any}', component: 'detail',
      resolve: {
        article: ['BlogService','$transition$',function(BlogService, $transition$) {
          return BlogService.getArticle($transition$.params()._articleUrl);
        }],
        articlePrevious: ['BlogService','$transition$',function(BlogService, $transition$) {
          return BlogService.getPreviousArticle($transition$.params()._articleUrl);
        }],
        articleNext: ['BlogService','$transition$',function(BlogService, $transition$) {
          return BlogService.getNextArticle($transition$.params()._articleUrl);
        }],
        content: ['BlogService', '$transition$', function(BlogService, $transition$) {
          return BlogService.getArticleContent($transition$.params()._articleUrl);
        }]
      }
    }
  ];

	// Loop over the state definitions and register them
  states.forEach(function(state) {
    $stateProvider.state(state);
  });

  // For any unmatched url, send to 
  $urlServiceProvider.rules.otherwise("/articles");
 
}]);



// +++++++++++++++++++++++++++++++++++++++++
// Components
jekyllApp.component('articles', articles )
.component('detail', detail );




jekyllApp.run(['$transitions', '$document',
	function($transitions, $document) {		

		$transitions.onSuccess({}, function(transition) {
	    $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
	  })
	  // or <ui-view autoscroll="true"></ui-view>
}]);

// https://github.com/angular-ui/ui-router/issues/816
// to evaluate, with html5 $locationProvider.html5Mode(true) ! pb with permalink jekyll
// 
// app.run(function($anchorScroll, $window) {
//   // hack to scroll to top when navigating to new URLS but not back/forward
//   var wrap = function(method) {
//     var orig = $window.window.history[method];
//     $window.window.history[method] = function() {
//       var retval = orig.apply(this, Array.prototype.slice.call(arguments));
//       $anchorScroll();
//       return retval;
//     };
//   };
//   wrap('pushState');
//   wrap('replaceState');
// })


