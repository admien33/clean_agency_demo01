import 'throttle-debounce'
import 'scrollspyext'
// +++++++++++++++++++++++++++++++++++++++++++++++++++
// template pages/navigation/collection/default_navbar_sections_pages.json
// +++++++++++++++++++++++++++++++++++++++++++++++++++
// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {

  var container_ref = '[canvas]';
	var element_ref = '#mainNavSectionsFixed';  
	var scrollOffset = 50;
  var offsetTopFixed = 100;

  var $container_ref = $(container_ref);
	var $element_ref = $(element_ref);

	if ($element_ref.height() != null) 
	{
    //fix visibility navbar-collapse
    if ($element_ref.find('.navbar-collapse').hasClass('hidden_collapse_navig')) {
      setTimeout(function(){ $element_ref.find('.navbar-collapse').removeClass('hidden_collapse_navig'); }, 300);      
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

    // Highlight the top nav as scrolling occurs
    // note: adapt default bs scrollpsy 3.3.7 !! 
    $container_ref.scrollspyext({
        target: element_ref,
        offset: (scrollOffset+1)
    });    
		

		// Offset affix for Main Navigation ,   
    // $('#mainNavSectionsFixed').affix({offset:{top: 100}})  ko
    // note: affix-top not implemented
    var headerHeightFixed = $element_ref.height();   
    headerHeightFixed += offsetTopFixed;
    function add_class_affix() 
    {
      var has_affix=$element_ref.hasClass('affix');
      ($(this).scrollTop() > headerHeightFixed) ? ((!has_affix)&&($element_ref.addClass('affix'))) : ((has_affix)&&($element_ref.removeClass('affix')));
    }
    $container_ref.scroll($.throttle(250, add_class_affix));     


	} // end if navbar defined
});

