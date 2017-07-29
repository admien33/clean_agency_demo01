// ! note vendor.js load first

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

// add in /assets_js/app/template_default_slider.js
// $(document).ready(function () { 
// 	$('.carousel').carousel({
// 	    interval: 5000 //changes the speed
// 	});
// });

// +++++++++++++++++++++++++++++++++++++++++++++++++++
// template_default_navbar_fixed.js 
// location json : pages/navigation/collection/default_navbar_fixed.json 
// +++++++++++++++++++++++++++++++++++++++++++++++++++
// Offset for Main Navigation, from creative startb
jQuery(document).ready(function($) {

	var container_ref = '[canvas]';
	var element_ref = '#mainDefaultNavFixed';
	var class_hidden_collapse = 'hidden_collapse_navig';
	var offsetTopFixed = 100;
	
	var $container_ref = $(container_ref);
	var $element_ref = $(element_ref);
	var headerHeightFixed = $element_ref.height();

	if (headerHeightFixed != null) 
	{
		//fix visibility navbar-collapse
    if ($element_ref.find('.navbar-collapse').hasClass(class_hidden_collapse)) {
      setTimeout(function(){ $element_ref.find('.navbar-collapse').removeClass(class_hidden_collapse); }, 300);      
    }
    // Closes the Responsive Menu on Menu Item Click, with default bs class on nav
    $element_ref.find('.navbar-collapse ul li a').click(function() {
      $element_ref.find('.navbar-toggle:visible').click();
    });
    //adapt margin-right to display scroll bar attached to canvas, and not default body,pb with bs    
    var container_width = $('.Site-body').width();
    var ref_width = $element_ref.width();
    var current_margin = $element_ref.css( "margin-right");
    current_margin = Number(current_margin.replace('px',''));
    var current_padding = $element_ref.css( "padding-right");
    current_padding = Number(current_padding.replace('px',''));
    var max_offset = current_margin + current_padding;
    ref_width += max_offset;
    if (max_offset > 0) 
    {
      //default touch screen
      var new_margin = 0;
      var new_padding = max_offset;
      if (container_width !== $('body').width()) 
      {
        //presence scroll
        if (ref_width > container_width) {
          var offset_width = ref_width - container_width; 
          new_margin = max_offset;
          new_padding = 0;
          if (offset_width < max_offset) {
            new_margin=offset_width;
            new_padding=max_offset-offset_width;
          }         
        }        
      }
      $element_ref.css( "margin-right",new_margin.toString() + 'px');
      $element_ref.css( "padding-right",new_padding.toString() + 'px');      
    }

		// Offset affix for Main Navigation ,   
    // $('#mainDefaultNavFixed').affix({offset:{top: 100}})  ko
    // note: affix-top not implemented
    headerHeightFixed += offsetTopFixed;
    function add_class_affix() 
    {
      var has_affix=$element_ref.hasClass('affix');
      ($(this).scrollTop() > headerHeightFixed) ? ((!has_affix)&&($element_ref.addClass('affix'))) : ((has_affix)&&($element_ref.removeClass('affix')));
    }
    $container_ref.scroll($.throttle(250, add_class_affix));     

	}// end if navbar defined

});
// +++++++++++++++++++++++++++++++++++++++++++++++++++


// +++++++++++++++++++++++++++++++++++++++++++++++++++
// template_default_navbar_custom
// location json : pages/navigation/collection/default_navbar_custom.json
// +++++++++++++++++++++++++++++++++++++++++++++++++++
// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {

	var container_ref = '[canvas]';
	var element_ref = '#mainDefaultNavCustom';
	var class_hidden_collapse = 'hidden_collapse_navig';
	var MQL = 768;//1170;
	var offsetTopCustom = 0;

	var $container_ref = $(container_ref);
	var $element_ref = $(element_ref);

	var headerHeightCustom = $element_ref.height();

	//primary navigation slide-in effect
	if (headerHeightCustom != null) 
	{
		//fix visibility navbar-collapse
    if ($element_ref.find('.navbar-collapse').hasClass(class_hidden_collapse)) {
      setTimeout(function(){ $element_ref.find('.navbar-collapse').removeClass(class_hidden_collapse); }, 300);      
    }
    // Closes the Responsive Menu on Menu Item Click, with default bs class on nav
    $element_ref.find('.navbar-collapse ul li a').click(function() {
      $element_ref.find('.navbar-toggle:visible').click();
    });
    //adapt margin-right to display scroll bar attached to canvas, and not default body,pb with bs    
    var container_width = $('.Site-body').width();
    var ref_width = $element_ref.width();
    var current_margin = $element_ref.css( "margin-right");
    current_margin = Number(current_margin.replace('px',''));
    var current_padding = $element_ref.css( "padding-right");
    current_padding = Number(current_padding.replace('px',''));
    var max_offset = current_margin + current_padding;
    ref_width += max_offset;
    if (max_offset > 0) 
    {
      //default touch screen
      var new_margin = 0;
      var new_padding = max_offset;
      if (container_width !== $('body').width()) 
      {
        //presence scroll
        if (ref_width > container_width) {
          var offset_width = ref_width - container_width; 
          new_margin = max_offset;
          new_padding = 0;
          if (offset_width < max_offset) {
            new_margin=offset_width;
            new_padding=max_offset-offset_width;
          }         
        }        
      }
      $element_ref.css( "margin-right",new_margin.toString() + 'px');
      $element_ref.css( "padding-right",new_padding.toString() + 'px');      
    }

		if ($(window).width() > MQL) 
		{			
			headerHeightCustom+=offsetTopCustom;
			var previousTop = 0;

			function add_class_visible_fixed() 
	    {
	      var has_is_fixed=$element_ref.hasClass('is-fixed');
	      var currentTop = $container_ref.scrollTop();
				//check if user is scrolling up
				if (currentTop < previousTop) 
				{	//if scrolling up...
					(currentTop > 0 && has_is_fixed) ? $element_ref.addClass('is-visible') : $element_ref.removeClass('is-visible is-fixed');					
				} 
				else 
				{	//if scrolling down...
					$element_ref.removeClass('is-visible');
					if (currentTop > headerHeightCustom && !has_is_fixed) {
						$element_ref.addClass('is-fixed');
					}					
				}
				previousTop = currentTop;
	    }
	    $container_ref.scroll($.throttle(250, add_class_visible_fixed));		
		}
	}
});
// +++++++++++++++++++++++++++++++++++++++++++++++++++




// +++++++++++++++++++++++++++++++++++++++++++++++++++
// template_default_navbar_dd_sections
// extra with template pages/navigation/collection/default_navbar_XXX_dd_sections.json
// +++++++++++++++++++++++++++++++++++++++++++++++++++
jQuery(document).ready(function($) {

    
  function updateDropdown() {
    if ($('.navbar-default li.dropdown').hasClass('open')) {
      setTimeout(function() {
        if (!$('.navbar-default ul.dropdown-menu').hasClass('open')) {
          $('.navbar-default li.dropdown').removeClass('open'); 
        }
        else {
          setTimeout(updateDropdown,500);
        }               
      }, 500);
    } 
  }

  $('.navbar-default li.dropdown a.dropdown-toggle').hover(
    function() {
      if (!$('.navbar-default li.dropdown').hasClass('open')) {
        setTimeout(function(){ 
          $('.navbar-default li.dropdown').addClass('open'); 
        }, 300); 
      }
      $('.navbar-default ul.dropdown-menu').addClass('open');    
    }, 
    function() {
      updateDropdown();    
  });
  $('.navbar-default li.dropdown ul.dropdown-menu a').hover( 
    function() {
     if (!$('.navbar-default ul.dropdown-menu').hasClass('open')) {
        $('.navbar-default ul.dropdown-menu').addClass('open'); 
      }
      $('.navbar-default li.dropdown').addClass('open');    
    }, 
    function() {
      if ($('.navbar-default ul.dropdown-menu').hasClass('open')) {
        $('.navbar-default ul.dropdown-menu').removeClass('open');
      }
      updateDropdown(); 
  });
  //close dropdown on scroll
  function close_dropdown_Throttle() 
  {
    setTimeout(function() {
      $('.navbar-default li.dropdown').removeClass('open'); 
      $('.navbar-default ul.dropdown-menu').removeClass('open');               
    }, 300);
  }
  $('[canvas]').scroll($.throttle(250,close_dropdown_Throttle)); 

});




// +++++++++++++++++++++++++++++++++++++++++++++++++++
// template_default_go_to_top_primary
// location json : pages/extra/collection/default_go_to_top_primary.json 
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
  $('[canvas]').scroll($.throttle(250, back_to_top_Throttle)); 
  //smooth scroll to top 
  $back_to_top.bind('click', function(event) {
	  var $anchor = $(this);
	  // $('html, body').stop().animate({
	  	$('[canvas]').stop().animate({
	  	scrollTop: $($anchor.attr('href')).offset().top
	  }, 1500, 'easeInOutExpo');
	  event.preventDefault();
  });
});
// +++++++++++++++++++++++++++++++++++++++++++++++++++
