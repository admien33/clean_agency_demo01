// ! note vendor.js load first

import 'picturefill'
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


//page scrolling feature on click a.page-scroll item - requires jQuery Easing plugin
//could be used on a lot of templates
$(document).ready(function () 
{ 
  var element_anchor = 'a.page-scroll';
  var container_ref = '[canvas]';
  var scrollOffset = 50;
  var offsetTopFixed = 100;
  
  var $container_ref = $(container_ref);

  $(element_anchor).bind('click', function(event) {
    var $anchor = $(this);
    var $refAnchor = $($anchor.attr('href'));

    var posTop = $refAnchor.offset().top;
    var  RefScrollTop = $container_ref.scrollTop();
    var activateScroll = false;
    //filter refAnchor on body, id default : #page-top
    if(($refAnchor.parents().length == 1)&&(RefScrollTop > offsetTopFixed))  
    { 
      posTop = RefScrollTop * (-1);
      activateScroll = true;        
    }
    else if (Math.abs(posTop) > 1) 
    {
      posTop+=RefScrollTop;
      posTop-=scrollOffset;
      activateScroll = true;          
    }
    if (activateScroll) 
    {
      $container_ref.stop().animate({
        scrollTop: posTop
      }, 1500, 'easeInOutExpo');        
    }
    event.preventDefault();
  });
});