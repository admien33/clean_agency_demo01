import "angular";
import 'angular-ui-router';
import 'angular-sanitize';

import {detail} from "./components/portfolio.detail";
import {PortfolioService} from "./components/portfolio.service";
	
var jekyllApp=angular.module('JekyllApp', ['ui.router','ngSanitize']);

jekyllApp.config(['$compileProvider', '$locationProvider', '$stateProvider', '$urlServiceProvider', '$provide',
 function ($compileProvider, $locationProvider, $stateProvider, $urlServiceProvider, $provide) {
  // optim production
  $compileProvider.debugInfoEnabled(false); 
	//$location service, keep history browser
	// add <base href="{{page.url}}">, not used on hashbang mode (html5Mode:false) 
	//see > 1.6.0 : default hashbang '!', https://docs.angularjs.org/guide/migration#-location-
	$locationProvider.html5Mode(false).hashPrefix('!');

	$provide.service('PortfolioService', PortfolioService); 

	// An array of state definitions
  let states = [	    
    { 
      name: 'detail', url: '/{_articleUrl:any}', component: 'detail',
      resolve: {
        article: ['PortfolioService','$transition$',function(PortfolioService, $transition$) {
        	return PortfolioService.getArticle($transition$.params()._articleUrl);
        }],
        articlePrevious: ['PortfolioService','$transition$',function(PortfolioService, $transition$) {
        	return PortfolioService.getPreviousArticle($transition$.params()._articleUrl);
        }],
        articleNext: ['PortfolioService','$transition$',function(PortfolioService, $transition$) {
        	return PortfolioService.getNextArticle($transition$.params()._articleUrl);
        }],
        content: ['PortfolioService', '$transition$', function(PortfolioService, $transition$) {
        	return PortfolioService.getArticleContent($transition$.params()._articleUrl);
        }]
      }
    }
  ];

	// Loop over the state definitions and register them
  states.forEach(state => $stateProvider.state(state));

  // For any unmatched url, send to 
  // $urlServiceProvider.rules.otherwise("/articles");

}]);


jekyllApp.component('detail', detail);


jekyllApp.run(['$transitions', '$document',
	function($transitions, $document) {		

		$transitions.onSuccess({}, function(transition) {
	    $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
	  })
	  // or <ui-view autoscroll="true"></ui-view>
}]);


