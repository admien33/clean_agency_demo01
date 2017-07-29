import 'throttle-debounce'


// +++++++++++++++++++++++++++++++++++++++++++++++++++
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

