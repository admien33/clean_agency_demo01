// ! note vendor.js load first

// require("./style_template_default_slider.css");
// require("./style_template_contact_stman_recaptcha.css");

import 'picturefill'
import 'throttle-debounce'
import 'easing'


// create element picture, necess with jekyll-picture-tag plugin
(function() {
	'use strict';
	document.createElement('picture');
})();


/*!
* Clean Blog v1.0.0 (http://startbootstrap.com)
* Copyright 2015 Start Bootstrap
* Licensed under MIT (https://spdx.org/licenses/MIT)
*/
// Tooltip Init
$(function() {
	$("[data-toggle='tooltip']").tooltip();
});

// make all images responsive
$(function() {
	$("img").addClass("img-responsive");
});

// responsive tables
$(document).ready(function() {
	$("table").wrap("<div class='table-responsive'></div>");
	$("table").addClass("table");
});

// responsive embed videos
$(document).ready(function () { 
	$('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
	$('iframe[src*="youtube.com"]').addClass('embed-responsive-item');
	$('iframe[src*="vimeo.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
	$('iframe[src*="vimeo.com"]').addClass('embed-responsive-item');
});

// add in /assets-js/app/template_default_slider.js
// $(document).ready(function () { 
// 	$('.carousel').carousel({
// 	    interval: 5000 //changes the speed
// 	});
// });


// +++++++++++++++++++++++++++++++++++++++++++++++++++
// template pages/navigation/default_navbar_custom
// +++++++++++++++++++++++++++++++++++++++++++++++++++
// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
	var MQL = 1170;

	//primary navigation slide-in effect
	if ($(window).width() > MQL) {
		var headerHeight = $('.navbar-custom').height();

		if (headerHeight != null) 
		{	
			$(window).on('scroll', 
				{
					previousTop: 0
				},
				function() 
				{
					var currentTop = $(window).scrollTop();
					//check if user is scrolling up
					if (currentTop < this.previousTop) {
						//if scrolling up...
						if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
							$('.navbar-custom').addClass('is-visible');
						} 
						else {
							$('.navbar-custom').removeClass('is-visible is-fixed');
						}
					} 
					else {
						//if scrolling down...
						$('.navbar-custom').removeClass('is-visible');
						if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) 
							$('.navbar-custom').addClass('is-fixed');
					}

					this.previousTop = currentTop;
				}
			);//end on scroll
		}
	}
});
// +++++++++++++++++++++++++++++++++++++++++++++++++++


// +++++++++++++++++++++++++++++++++++++++++++++++++++
// template pages/navigation/default_navbar_fixed
// +++++++++++++++++++++++++++++++++++++++++++++++++++
// Offset for Main Navigation, from creative startb
jQuery(document).ready(function($) {
	// $('#mainDefaultNavFixed').affix({
		$('#mainDefaultNavFixed').affix({
	    offset: {
	        top: 100
	    }
	});
});
// +++++++++++++++++++++++++++++++++++++++++++++++++++


// +++++++++++++++++++++++++++++++++++++++++++++++++++
// template pages/extra/default_go_to_top_primary
// +++++++++++++++++++++++++++++++++++++++++++++++++++
jQuery(document).ready(function($) {

  // browser window scroll (in pixels) after which the "back to top" link is shown
  var offset = 800,
  //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
  offset_opacity = 1200,
  //duration of the top scrolling animation (in ms)
  scroll_top_duration = 700,
  //grab the "back to top" link
  $back_to_top = $('a.cd-top');
  //hide or show the "back to top" link
  function back_to_top_Throttle() 
  {
    ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
    if( $(this).scrollTop() > offset_opacity ) { 
      $back_to_top.addClass('cd-fade-out');
    }
  }
  $(window).scroll($.throttle(250, back_to_top_Throttle)); 
  //smooth scroll to top 
  $back_to_top.bind('click', function(event) {
	  var $anchor = $(this);
	  $('html, body').stop().animate({
	  	scrollTop: $($anchor.attr('href')).offset().top
	  }, 1500, 'easeInOutExpo');
	  event.preventDefault();
  });
});
// +++++++++++++++++++++++++++++++++++++++++++++++++++
