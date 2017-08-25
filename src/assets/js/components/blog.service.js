import {SessionStorage} from "./util/sessionStorage";


export class BlogService extends SessionStorage {

	constructor($http, $q) {

    super($http, $q, "blog", BASE_URL+'/blog_articles.json');
    this.$http = $http;
  }

  getAllArticles() {
	  return this.all(data => data.list);
	}

	getConfig() {
		return this.all(data => data.config);	 
	}

	getArticle(url) {	  
	  return this.getAllArticles().then(articles => 
	  	articles.find(article => article.relative_url === url) );
	}

	getArticleContent(url) {
		return this.getArticle(url).then(article =>
			this.$http.get(article.path_json, { cache: true }).then(resp => resp.data.post.content) );
	}

	getPreviousArticle(url) {
		return this.getAllArticles().then(function(articles) { 
			let index_current = articles.findIndex(article => article.relative_url === url);
			return (index_current===0) ? undefined : articles[index_current-1];
		});
	}

	getNextArticle(url) {
		return this.getAllArticles().then(function(articles) { 
			let index_current = articles.findIndex(article => article.relative_url === url);
			return (index_current===(articles.length-1)) ? undefined : articles[index_current+1];
		});
	}

}

BlogService.$inject = ['$http', '$q'];
