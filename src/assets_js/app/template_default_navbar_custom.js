import 'throttle-debounce'

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
