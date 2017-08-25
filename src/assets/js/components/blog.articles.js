
export const articles = {

	bindings: { articles: '<'},

	// script ng-template /src/_includes/templates/page_site/section/blog_angular_content.html
	templateUrl: 'templateListBlog.html',

	controller: ['$http', function BlogListController($http) {
    var self = this;
    self.orderProp = '-raw_date';  
	
  }]
  
}