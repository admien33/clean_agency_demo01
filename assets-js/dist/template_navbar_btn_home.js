webpackJsonp([0],{

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/*!
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * adapted webpack, jquery 21/06/17
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery throttle / debounce: Sometimes, less is more!
//
// *Version: 1.1, Last updated: 3/7/2010*
// 
// Project Home - http://benalman.com/projects/jquery-throttle-debounce-plugin/
// GitHub       - http://github.com/cowboy/jquery-throttle-debounce/
// Source       - http://github.com/cowboy/jquery-throttle-debounce/raw/master/jquery.ba-throttle-debounce.js
// (Minified)   - http://github.com/cowboy/jquery-throttle-debounce/raw/master/jquery.ba-throttle-debounce.min.js (0.7kb)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// Throttle - http://benalman.com/code/projects/jquery-throttle-debounce/examples/throttle/
// Debounce - http://benalman.com/code/projects/jquery-throttle-debounce/examples/debounce/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - none, 1.3.2, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome 4-5, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-throttle-debounce/unit/
// 
// About: Release History
// 
// 1.1 - (3/7/2010) Fixed a bug in <jQuery.throttle> where trailing callbacks
//       executed later than they should. Reworked a fair amount of internal
//       logic as well.
// 1.0 - (3/6/2010) Initial release as a stand-alone project. Migrated over
//       from jquery-misc repo v0.4 to jquery-throttle repo v1.0, added the
//       no_trailing throttle parameter and debounce functionality.
// 
// Topic: Note for non-jQuery users
// 
// jQuery isn't actually required for this plugin, because nothing internal
// uses any jQuery methods or properties. jQuery is just used as a namespace
// under which these methods can exist.
// 
// Since jQuery isn't actually required for this plugin, if jQuery doesn't exist
// when this plugin is loaded, the method described below will be created in
// the `Cowboy` namespace. Usage will be exactly the same, but instead of
// $.method() or jQuery.method(), you'll need to use Cowboy.method().

// (function(window,undefined){
//   '$:nomunge'; // Used by YUI compressor.
  
//   // Since jQuery really isn't required for this plugin, use `jQuery` as the
//   // namespace only if it already exists, otherwise use the `Cowboy` namespace,
//   // creating it if necessary.
//   var $ = window.jQuery || window.Cowboy || ( window.Cowboy = {} ),
(function($) {   
    // Internal method reference.
    var jq_throttle;
  
  // Method: jQuery.throttle
  // 
  // Throttle execution of a function. Especially useful for rate limiting
  // execution of handlers on events like resize and scroll. If you want to
  // rate-limit execution of a function to a single time, see the
  // <jQuery.debounce> method.
  // 
  // In this visualization, | is a throttled-function call and X is the actual
  // callback execution:
  // 
  // > Throttled with `no_trailing` specified as false or unspecified:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // > X    X    X    X    X    X        X    X    X    X    X    X
  // > 
  // > Throttled with `no_trailing` specified as true:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // > X    X    X    X    X             X    X    X    X    X
  // 
  // Usage:
  // 
  // > var throttled = jQuery.throttle( delay, [ no_trailing, ] callback );
  // > 
  // > jQuery('selector').bind( 'someevent', throttled );
  // > jQuery('selector').unbind( 'someevent', throttled );
  // 
  // This also works in jQuery 1.4+:
  // 
  // > jQuery('selector').bind( 'someevent', jQuery.throttle( delay, [ no_trailing, ] callback ) );
  // > jQuery('selector').unbind( 'someevent', callback );
  // 
  // Arguments:
  // 
  //  delay - (Number) A zero-or-greater delay in milliseconds. For event
  //    callbacks, values around 100 or 250 (or even higher) are most useful.
  //  no_trailing - (Boolean) Optional, defaults to false. If no_trailing is
  //    true, callback will only execute every `delay` milliseconds while the
  //    throttled-function is being called. If no_trailing is false or
  //    unspecified, callback will be executed one final time after the last
  //    throttled-function call. (After the throttled-function has not been
  //    called for `delay` milliseconds, the internal counter is reset)
  //  callback - (Function) A function to be executed after delay milliseconds.
  //    The `this` context and all arguments are passed through, as-is, to
  //    `callback` when the throttled-function is executed.
  // 
  // Returns:
  // 
  //  (Function) A new, throttled, function.
  
  $.throttle = jq_throttle = function( delay, no_trailing, callback, debounce_mode ) {
    // After wrapper has stopped being called, this timeout ensures that
    // `callback` is executed at the proper times in `throttle` and `end`
    // debounce modes.
    var timeout_id,
      
      // Keep track of the last time `callback` was executed.
      last_exec = 0;
    
    // `no_trailing` defaults to falsy.
    if ( typeof no_trailing !== 'boolean' ) {
      debounce_mode = callback;
      callback = no_trailing;
      no_trailing = undefined;
    }
    
    // The `wrapper` function encapsulates all of the throttling / debouncing
    // functionality and when executed will limit the rate at which `callback`
    // is executed.
    function wrapper() {
      var that = this,
        elapsed = +new Date() - last_exec,
        args = arguments;
      
      // Execute `callback` and update the `last_exec` timestamp.
      function exec() {
        last_exec = +new Date();
        callback.apply( that, args );
      };
      
      // If `debounce_mode` is true (at_begin) this is used to clear the flag
      // to allow future `callback` executions.
      function clear() {
        timeout_id = undefined;
      };
      
      if ( debounce_mode && !timeout_id ) {
        // Since `wrapper` is being called for the first time and
        // `debounce_mode` is true (at_begin), execute `callback`.
        exec();
      }
      
      // Clear any existing timeout.
      timeout_id && clearTimeout( timeout_id );
      
      if ( debounce_mode === undefined && elapsed > delay ) {
        // In throttle mode, if `delay` time has been exceeded, execute
        // `callback`.
        exec();
        
      } else if ( no_trailing !== true ) {
        // In trailing throttle mode, since `delay` time has not been
        // exceeded, schedule `callback` to execute `delay` ms after most
        // recent execution.
        // 
        // If `debounce_mode` is true (at_begin), schedule `clear` to execute
        // after `delay` ms.
        // 
        // If `debounce_mode` is false (at end), schedule `callback` to
        // execute after `delay` ms.
        timeout_id = setTimeout( debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay );
      }
    };
    
    // Set the guid of `wrapper` function to the same of original callback, so
    // it can be removed in jQuery 1.4+ .unbind or .die by using the original
    // callback as a reference.
    if ( $.guid ) {
      wrapper.guid = callback.guid = callback.guid || $.guid++;
    }
    
    // Return the wrapper function.
    return wrapper;
  };
  
  // Method: jQuery.debounce
  // 
  // Debounce execution of a function. Debouncing, unlike throttling,
  // guarantees that a function is only executed a single time, either at the
  // very beginning of a series of calls, or at the very end. If you want to
  // simply rate-limit execution of a function, see the <jQuery.throttle>
  // method.
  // 
  // In this visualization, | is a debounced-function call and X is the actual
  // callback execution:
  // 
  // > Debounced with `at_begin` specified as false or unspecified:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // >                          X                                 X
  // > 
  // > Debounced with `at_begin` specified as true:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // > X                                 X
  // 
  // Usage:
  // 
  // > var debounced = jQuery.debounce( delay, [ at_begin, ] callback );
  // > 
  // > jQuery('selector').bind( 'someevent', debounced );
  // > jQuery('selector').unbind( 'someevent', debounced );
  // 
  // This also works in jQuery 1.4+:
  // 
  // > jQuery('selector').bind( 'someevent', jQuery.debounce( delay, [ at_begin, ] callback ) );
  // > jQuery('selector').unbind( 'someevent', callback );
  // 
  // Arguments:
  // 
  //  delay - (Number) A zero-or-greater delay in milliseconds. For event
  //    callbacks, values around 100 or 250 (or even higher) are most useful.
  //  at_begin - (Boolean) Optional, defaults to false. If at_begin is false or
  //    unspecified, callback will only be executed `delay` milliseconds after
  //    the last debounced-function call. If at_begin is true, callback will be
  //    executed only at the first debounced-function call. (After the
  //    throttled-function has not been called for `delay` milliseconds, the
  //    internal counter is reset)
  //  callback - (Function) A function to be executed after delay milliseconds.
  //    The `this` context and all arguments are passed through, as-is, to
  //    `callback` when the debounced-function is executed.
  // 
  // Returns:
  // 
  //  (Function) A new, debounced, function.
  
  $.debounce = function( delay, at_begin, callback ) {
    return callback === undefined
      ? jq_throttle( delay, at_begin, false )
      : jq_throttle( delay, callback, at_begin !== false );
  };
  
// })(this);
})(jQuery);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_easing__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_easing___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_easing__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_throttle_debounce__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_throttle_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_throttle_debounce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_scrollspyext__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_scrollspyext___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_scrollspyext__);



// +++++++++++++++++++++++++++++++++++++++++++++++++++
// template page_site/header/collection/bg_full_img_welc_btn.json
// +++++++++++++++++++++++++++++++++++++++++++++++++++
// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {

  var container_ref = '[canvas]';
	var element_ref = '#mainNavSectionsFixed';
  var element_anchor = 'a.page-scroll';
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

    

		//page scrolling feature on click a.page-scroll item - requires jQuery Easing plugin
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


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var jQuery = __webpack_require__(0);
var $ = __webpack_require__(0);
(function() {

/*
 * jQuery Easing v1.3.2 - http://gsgd.co.uk/sandbox/jquery/easing/
 * Open source under the BSD License.
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * https://raw.github.com/gdsmith/jquery-easing/master/LICENSE
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
(function($){$.easing['jswing'] = $.easing['swing'];

$.extend( $.easing,
{
  def: 'easeOutQuad',
  swing: function (x, t, b, c, d) {
    //alert($.easing.default);
    return $.easing[$.easing.def](x, t, b, c, d);
  },
  // easeInQuad: function (x, t, b, c, d) {
  //   return c*(t/=d)*t + b;
  // },
  // easeOutQuad: function (x, t, b, c, d) {
  //   return -c *(t/=d)*(t-2) + b;
  // },
  // easeInOutQuad: function (x, t, b, c, d) {
  //   if ((t/=d/2) < 1) return c/2*t*t + b;
  //   return -c/2 * ((--t)*(t-2) - 1) + b;
  // },
  // easeInCubic: function (x, t, b, c, d) {
  //   return c*(t/=d)*t*t + b;
  // },
  // easeOutCubic: function (x, t, b, c, d) {
  //   return c*((t=t/d-1)*t*t + 1) + b;
  // },
  // easeInOutCubic: function (x, t, b, c, d) {
  //   if ((t/=d/2) < 1) return c/2*t*t*t + b;
  //   return c/2*((t-=2)*t*t + 2) + b;
  // },
  // easeInQuart: function (x, t, b, c, d) {
  //   return c*(t/=d)*t*t*t + b;
  // },
  // easeOutQuart: function (x, t, b, c, d) {
  //   return -c * ((t=t/d-1)*t*t*t - 1) + b;
  // },
  // easeInOutQuart: function (x, t, b, c, d) {
  //   if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
  //   return -c/2 * ((t-=2)*t*t*t - 2) + b;
  // },
  // easeInQuint: function (x, t, b, c, d) {
  //   return c*(t/=d)*t*t*t*t + b;
  // },
  // easeOutQuint: function (x, t, b, c, d) {
  //   return c*((t=t/d-1)*t*t*t*t + 1) + b;
  // },
  // easeInOutQuint: function (x, t, b, c, d) {
  //   if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
  //   return c/2*((t-=2)*t*t*t*t + 2) + b;
  // },
  // easeInSine: function (x, t, b, c, d) {
  //   return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  // },
  // easeOutSine: function (x, t, b, c, d) {
  //   return c * Math.sin(t/d * (Math.PI/2)) + b;
  // },
  // easeInOutSine: function (x, t, b, c, d) {
  //   return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  // },
  // easeInExpo: function (x, t, b, c, d) {
  //   return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  // },
  // easeOutExpo: function (x, t, b, c, d) {
  //   return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  // },
  easeInOutExpo: function (x, t, b, c, d) {
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  } //,
  // easeInCirc: function (x, t, b, c, d) {
  //   return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  // },
  // easeOutCirc: function (x, t, b, c, d) {
  //   return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  // },
  // easeInOutCirc: function (x, t, b, c, d) {
  //   if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
  //   return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  // },
  // easeInElastic: function (x, t, b, c, d) {
  //   var s=1.70158;var p=0;var a=c;
  //   if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
  //   if (a < Math.abs(c)) { a=c; var s=p/4; }
  //   else var s = p/(2*Math.PI) * Math.asin (c/a);
  //   return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  // },
  // easeOutElastic: function (x, t, b, c, d) {
  //   var s=1.70158;var p=0;var a=c;
  //   if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
  //   if (a < Math.abs(c)) { a=c; var s=p/4; }
  //   else var s = p/(2*Math.PI) * Math.asin (c/a);
  //   return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  // },
  // easeInOutElastic: function (x, t, b, c, d) {
  //   var s=1.70158;var p=0;var a=c;
  //   if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
  //   if (a < Math.abs(c)) { a=c; var s=p/4; }
  //   else var s = p/(2*Math.PI) * Math.asin (c/a);
  //   if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  //   return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
  // },
  // easeInBack: function (x, t, b, c, d, s) {
  //   if (s == undefined) s = 1.70158;
  //   return c*(t/=d)*t*((s+1)*t - s) + b;
  // },
  // easeOutBack: function (x, t, b, c, d, s) {
  //   if (s == undefined) s = 1.70158;
  //   return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  // },
  // easeInOutBack: function (x, t, b, c, d, s) {
  //   if (s == undefined) s = 1.70158;
  //   if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
  //   return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  // },
  // easeInBounce: function (x, t, b, c, d) {
  //   return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
  // },
  // easeOutBounce: function (x, t, b, c, d) {
  //   if ((t/=d) < (1/2.75)) {
  //     return c*(7.5625*t*t) + b;
  //   } else if (t < (2/2.75)) {
  //     return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
  //   } else if (t < (2.5/2.75)) {
  //     return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
  //   } else {
  //     return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
  //   }
  // },
  // easeInOutBounce: function (x, t, b, c, d) {
  //   if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
  //   return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
  // }
});})(jQuery);

}.call(window));

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var jQuery = __webpack_require__(0);
var $ = __webpack_require__(0);
(function() {

// adapt from 3.3.7, pb with position relative on scrollelement, comment line 46

(function($) {

	'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpyExt(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpyExt.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspyext', $.proxy(this.process, this))
    this.refresh()
    this.process()

  }

  ScrollSpyExt.VERSION  = '3.3.7'

  ScrollSpyExt.DEFAULTS = {
    offset: 10
  }

  ScrollSpyExt.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpyExt.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      // offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpyExt.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpyExt.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspyext')
  }

  ScrollSpyExt.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspyext')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspyext', (data = new ScrollSpyExt(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspyext

  $.fn.scrollspyext             = Plugin
  $.fn.scrollspyext.Constructor = ScrollSpyExt


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspyext.noConflict = function () {
    $.fn.scrollspyext = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  // $(window).on('load.bs.scrollspy.data-api', function () {
  //   $('[data-spy="scroll"]').each(function () {
  //     var $spy = $(this)
  //     Plugin.call($spy, $spy.data())
  //   })
  // })



})(jQuery);
}.call(window));

/***/ })

},[13]);