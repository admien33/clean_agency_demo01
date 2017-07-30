import 'throttle-debounce'
import 'easing'


// +++++++++++++++++++++++++++++++++++++++++++++++++++
// template_pages_extra_go_to_top_primary
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