webpackJsonp([3],{24:function(e,a,t){"use strict";t(25),t(4),t(26)},25:function(e,a,t){"use strict";(function(e){t(2);var a=angular.module("JekyllApp",[]);a.config(["$compileProvider","$locationProvider",function(e,a){e.debugInfoEnabled(!1),a.html5Mode(!1).hashPrefix("!")}]),a.controller("ContentCtrl",["$scope","$http","$location",function(a,t,i){var r=e("article");!r.hasClass("invArticle")&&r.addClass("invArticle"),e(".pager .previous a").click(function(){setTimeout(function(){window.location.reload()})}),e(".pager .next a").click(function(){setTimeout(function(){window.location.reload()})}),window.addEventListener("popstate",function(e){setTimeout(function(){window.location.reload()})});var n={},l=-1;t.get("/clean_agency_demo01/blog_articles.json").then(function(a){var o=a.data;n=o.list,l=n.length;var s=o.config.hash_prefix,c=o.config.url_page_index;if(i.path().length>0){for(var d=null,p=i.path(),v=-1,f=0;f<l;f++){if(n[f].path_folder+n[f].name_id===p){d=n[f],v=f;break}}null!==d?t.get(d.path_json).then(function(a){var t=a.data;e(".articleContent").empty(),e(".articleContent").append(t.post.content),e(".post-heading .heading").empty(),e(".post-heading .heading").append(d.title),e(".post-heading .subheading").empty(),e(".post-heading .subheading").append(d.description),e(".img_header").attr("src",d.path_header_img),e(".meta .date").empty(),e(".meta .date").append(d.meta_date),e(".pager .previous").addClass("invPager"),e(".pager .next").addClass("invPager");for(var i=v-1,o=null,p=i;p>=0;p--)if(n[p].path_folder===d.path_folder){o=n[p];break}for(var i=v+1,f=null,p=i;p<l;p++)if(n[p].path_folder===d.path_folder){f=n[p];break}if(null!==o){var h=c+s+o.path_folder+o.name_id;e(".pager .next a").attr("href",h),e(".pager .next a").attr("title",o.title),e(".pager .next").removeClass("invPager")}if(null!==f){var h=c+s+f.path_folder+f.name_id;e(".pager .previous a").attr("href",h),e(".pager .previous a").attr("title",f.title),e(".pager .previous").removeClass("invPager")}e("article .articleHeader").hasClass("invArticle")&&e("article .articleHeader").removeClass("invArticle"),e("article .articleDetail").hasClass("invArticle")&&e("article .articleDetail").removeClass("invArticle"),r.removeClass("invArticle")}):(e("article .articleList").hasClass("invArticle")&&e("article .articleList").removeClass("invArticle"),r.removeClass("invArticle"))}else e("article .articleList").hasClass("invArticle")&&e("article .articleList").removeClass("invArticle"),r.removeClass("invArticle")})}]),a.component("searchBlog",{templateUrl:"templateSearchBlog.html",controller:["$http","$scope",function(e,a){var t=this;t.orderProp="-raw_date",t.click=function(){setTimeout(function(){window.location.reload()})},e.get("/clean_agency_demo01/blog_articles.json").then(function(e){var a=e.data;t.articles=a.list,t.baseUrl=a.config.url_page_index+a.config.hash_prefix})}]})}).call(a,t(0))},26:function(e,a){},4:function(e,a,t){"use strict";(function(e){t(1),e(document).ready(function(e){var a=e("[canvas]"),t=e("#mainDefaultNavFixed"),i=t.height();if(null!=i){var r=function(){var a=t.hasClass("affix");e(this).scrollTop()>i?!a&&t.addClass("affix"):a&&t.removeClass("affix")};t.find(".navbar-collapse").hasClass("hidden_collapse_navig")&&setTimeout(function(){t.find(".navbar-collapse").removeClass("hidden_collapse_navig")},300),t.find(".navbar-collapse ul li a").click(function(){t.find(".navbar-toggle:visible").click()});var n=e(".Site-body").width(),l=t.width(),o=t.css("margin-right");o=Number(o.replace("px",""));var s=t.css("padding-right");s=Number(s.replace("px",""));var c=o+s;if(l+=c,c>0){var d=0,p=c;if(n!==e("body").width()&&l>n){var v=l-n;d=c,p=0,v<c&&(d=v,p=c-v)}t.css("margin-right",d.toString()+"px"),t.css("padding-right",p.toString()+"px")}i+=100,a.scroll(e.throttle(250,r))}})}).call(a,t(0))}},[24]);