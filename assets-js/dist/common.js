webpackJsonp([0],[
/* 0 */,
/* 1 */
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
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
!function(a){var b=navigator.userAgent;a.HTMLPictureElement&&/ecko/.test(b)&&b.match(/rv\:(\d+)/)&&RegExp.$1<45&&addEventListener("resize",function(){var b,c=document.createElement("source"),d=function(a){var b,d,e=a.parentNode;"PICTURE"===e.nodeName.toUpperCase()?(b=c.cloneNode(),e.insertBefore(b,e.firstElementChild),setTimeout(function(){e.removeChild(b)})):(!a._pfLastSize||a.offsetWidth>a._pfLastSize)&&(a._pfLastSize=a.offsetWidth,d=a.sizes,a.sizes+=",100vw",setTimeout(function(){a.sizes=d}))},e=function(){var a,b=document.querySelectorAll("picture > img, img[srcset][sizes]");for(a=0;a<b.length;a++)d(b[a])},f=function(){clearTimeout(b),b=setTimeout(e,99)},g=a.matchMedia&&matchMedia("(orientation: landscape)"),h=function(){f(),g&&g.addListener&&g.addListener(f)};return c.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?h():document.addEventListener("DOMContentLoaded",h),f}())}(window),function(a,b,c){"use strict";function d(a){return" "===a||"	"===a||"\n"===a||"\f"===a||"\r"===a}function e(b,c){var d=new a.Image;return d.onerror=function(){A[b]=!1,ba()},d.onload=function(){A[b]=1===d.width,ba()},d.src=c,"pending"}function f(){M=!1,P=a.devicePixelRatio,N={},O={},s.DPR=P||1,Q.width=Math.max(a.innerWidth||0,z.clientWidth),Q.height=Math.max(a.innerHeight||0,z.clientHeight),Q.vw=Q.width/100,Q.vh=Q.height/100,r=[Q.height,Q.width,P].join("-"),Q.em=s.getEmValue(),Q.rem=Q.em}function g(a,b,c,d){var e,f,g,h;return"saveData"===B.algorithm?a>2.7?h=c+1:(f=b-c,e=Math.pow(a-.6,1.5),g=f*e,d&&(g+=.1*e),h=a+g):h=c>1?Math.sqrt(a*b):a,h>c}function h(a){var b,c=s.getSet(a),d=!1;"pending"!==c&&(d=r,c&&(b=s.setRes(c),s.applySetCandidate(b,a))),a[s.ns].evaled=d}function i(a,b){return a.res-b.res}function j(a,b,c){var d;return!c&&b&&(c=a[s.ns].sets,c=c&&c[c.length-1]),d=k(b,c),d&&(b=s.makeUrl(b),a[s.ns].curSrc=b,a[s.ns].curCan=d,d.res||aa(d,d.set.sizes)),d}function k(a,b){var c,d,e;if(a&&b)for(e=s.parseSet(b),a=s.makeUrl(a),c=0;c<e.length;c++)if(a===s.makeUrl(e[c].url)){d=e[c];break}return d}function l(a,b){var c,d,e,f,g=a.getElementsByTagName("source");for(c=0,d=g.length;d>c;c++)e=g[c],e[s.ns]=!0,f=e.getAttribute("srcset"),f&&b.push({srcset:f,media:e.getAttribute("media"),type:e.getAttribute("type"),sizes:e.getAttribute("sizes")})}function m(a,b){function c(b){var c,d=b.exec(a.substring(m));return d?(c=d[0],m+=c.length,c):void 0}function e(){var a,c,d,e,f,i,j,k,l,m=!1,o={};for(e=0;e<h.length;e++)f=h[e],i=f[f.length-1],j=f.substring(0,f.length-1),k=parseInt(j,10),l=parseFloat(j),X.test(j)&&"w"===i?((a||c)&&(m=!0),0===k?m=!0:a=k):Y.test(j)&&"x"===i?((a||c||d)&&(m=!0),0>l?m=!0:c=l):X.test(j)&&"h"===i?((d||c)&&(m=!0),0===k?m=!0:d=k):m=!0;m||(o.url=g,a&&(o.w=a),c&&(o.d=c),d&&(o.h=d),d||c||a||(o.d=1),1===o.d&&(b.has1x=!0),o.set=b,n.push(o))}function f(){for(c(T),i="",j="in descriptor";;){if(k=a.charAt(m),"in descriptor"===j)if(d(k))i&&(h.push(i),i="",j="after descriptor");else{if(","===k)return m+=1,i&&h.push(i),void e();if("("===k)i+=k,j="in parens";else{if(""===k)return i&&h.push(i),void e();i+=k}}else if("in parens"===j)if(")"===k)i+=k,j="in descriptor";else{if(""===k)return h.push(i),void e();i+=k}else if("after descriptor"===j)if(d(k));else{if(""===k)return void e();j="in descriptor",m-=1}m+=1}}for(var g,h,i,j,k,l=a.length,m=0,n=[];;){if(c(U),m>=l)return n;g=c(V),h=[],","===g.slice(-1)?(g=g.replace(W,""),e()):f()}}function n(a){function b(a){function b(){f&&(g.push(f),f="")}function c(){g[0]&&(h.push(g),g=[])}for(var e,f="",g=[],h=[],i=0,j=0,k=!1;;){if(e=a.charAt(j),""===e)return b(),c(),h;if(k){if("*"===e&&"/"===a[j+1]){k=!1,j+=2,b();continue}j+=1}else{if(d(e)){if(a.charAt(j-1)&&d(a.charAt(j-1))||!f){j+=1;continue}if(0===i){b(),j+=1;continue}e=" "}else if("("===e)i+=1;else if(")"===e)i-=1;else{if(","===e){b(),c(),j+=1;continue}if("/"===e&&"*"===a.charAt(j+1)){k=!0,j+=2;continue}}f+=e,j+=1}}}function c(a){return k.test(a)&&parseFloat(a)>=0?!0:l.test(a)?!0:"0"===a||"-0"===a||"+0"===a?!0:!1}var e,f,g,h,i,j,k=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,l=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(f=b(a),g=f.length,e=0;g>e;e++)if(h=f[e],i=h[h.length-1],c(i)){if(j=i,h.pop(),0===h.length)return j;if(h=h.join(" "),s.matchesMedia(h))return j}return"100vw"}b.createElement("picture");var o,p,q,r,s={},t=!1,u=function(){},v=b.createElement("img"),w=v.getAttribute,x=v.setAttribute,y=v.removeAttribute,z=b.documentElement,A={},B={algorithm:""},C="data-pfsrc",D=C+"set",E=navigator.userAgent,F=/rident/.test(E)||/ecko/.test(E)&&E.match(/rv\:(\d+)/)&&RegExp.$1>35,G="currentSrc",H=/\s+\+?\d+(e\d+)?w/,I=/(\([^)]+\))?\s*(.+)/,J=a.picturefillCFG,K="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",L="font-size:100%!important;",M=!0,N={},O={},P=a.devicePixelRatio,Q={px:1,"in":96},R=b.createElement("a"),S=!1,T=/^[ \t\n\r\u000c]+/,U=/^[, \t\n\r\u000c]+/,V=/^[^ \t\n\r\u000c]+/,W=/[,]+$/,X=/^\d+$/,Y=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,Z=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent&&a.attachEvent("on"+b,c)},$=function(a){var b={};return function(c){return c in b||(b[c]=a(c)),b[c]}},_=function(){var a=/^([\d\.]+)(em|vw|px)$/,b=function(){for(var a=arguments,b=0,c=a[0];++b in a;)c=c.replace(a[b],a[++b]);return c},c=$(function(a){return"return "+b((a||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(b,d){var e;if(!(b in N))if(N[b]=!1,d&&(e=b.match(a)))N[b]=e[1]*Q[e[2]];else try{N[b]=new Function("e",c(b))(Q)}catch(f){}return N[b]}}(),aa=function(a,b){return a.w?(a.cWidth=s.calcListLength(b||"100vw"),a.res=a.w/a.cWidth):a.res=a.d,a},ba=function(a){if(t){var c,d,e,f=a||{};if(f.elements&&1===f.elements.nodeType&&("IMG"===f.elements.nodeName.toUpperCase()?f.elements=[f.elements]:(f.context=f.elements,f.elements=null)),c=f.elements||s.qsa(f.context||b,f.reevaluate||f.reselect?s.sel:s.selShort),e=c.length){for(s.setupRun(f),S=!0,d=0;e>d;d++)s.fillImg(c[d],f);s.teardownRun(f)}}};o=a.console&&console.warn?function(a){console.warn(a)}:u,G in v||(G="src"),A["image/jpeg"]=!0,A["image/gif"]=!0,A["image/png"]=!0,A["image/svg+xml"]=b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),s.ns=("pf"+(new Date).getTime()).substr(0,9),s.supSrcset="srcset"in v,s.supSizes="sizes"in v,s.supPicture=!!a.HTMLPictureElement,s.supSrcset&&s.supPicture&&!s.supSizes&&!function(a){v.srcset="data:,a",a.src="data:,a",s.supSrcset=v.complete===a.complete,s.supPicture=s.supSrcset&&s.supPicture}(b.createElement("img")),s.supSrcset&&!s.supSizes?!function(){var a="data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",c="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",d=b.createElement("img"),e=function(){var a=d.width;2===a&&(s.supSizes=!0),q=s.supSrcset&&!s.supSizes,t=!0,setTimeout(ba)};d.onload=e,d.onerror=e,d.setAttribute("sizes","9px"),d.srcset=c+" 1w,"+a+" 9w",d.src=c}():t=!0,s.selShort="picture>img,img[srcset]",s.sel=s.selShort,s.cfg=B,s.DPR=P||1,s.u=Q,s.types=A,s.setSize=u,s.makeUrl=$(function(a){return R.href=a,R.href}),s.qsa=function(a,b){return"querySelector"in a?a.querySelectorAll(b):[]},s.matchesMedia=function(){return a.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?s.matchesMedia=function(a){return!a||matchMedia(a).matches}:s.matchesMedia=s.mMQ,s.matchesMedia.apply(this,arguments)},s.mMQ=function(a){return a?_(a):!0},s.calcLength=function(a){var b=_(a,!0)||!1;return 0>b&&(b=!1),b},s.supportsType=function(a){return a?A[a]:!0},s.parseSize=$(function(a){var b=(a||"").match(I);return{media:b&&b[1],length:b&&b[2]}}),s.parseSet=function(a){return a.cands||(a.cands=m(a.srcset,a)),a.cands},s.getEmValue=function(){var a;if(!p&&(a=b.body)){var c=b.createElement("div"),d=z.style.cssText,e=a.style.cssText;c.style.cssText=K,z.style.cssText=L,a.style.cssText=L,a.appendChild(c),p=c.offsetWidth,a.removeChild(c),p=parseFloat(p,10),z.style.cssText=d,a.style.cssText=e}return p||16},s.calcListLength=function(a){if(!(a in O)||B.uT){var b=s.calcLength(n(a));O[a]=b?b:Q.width}return O[a]},s.setRes=function(a){var b;if(a){b=s.parseSet(a);for(var c=0,d=b.length;d>c;c++)aa(b[c],a.sizes)}return b},s.setRes.res=aa,s.applySetCandidate=function(a,b){if(a.length){var c,d,e,f,h,k,l,m,n,o=b[s.ns],p=s.DPR;if(k=o.curSrc||b[G],l=o.curCan||j(b,k,a[0].set),l&&l.set===a[0].set&&(n=F&&!b.complete&&l.res-.1>p,n||(l.cached=!0,l.res>=p&&(h=l))),!h)for(a.sort(i),f=a.length,h=a[f-1],d=0;f>d;d++)if(c=a[d],c.res>=p){e=d-1,h=a[e]&&(n||k!==s.makeUrl(c.url))&&g(a[e].res,c.res,p,a[e].cached)?a[e]:c;break}h&&(m=s.makeUrl(h.url),o.curSrc=m,o.curCan=h,m!==k&&s.setSrc(b,h),s.setSize(b))}},s.setSrc=function(a,b){var c;a.src=b.url,"image/svg+xml"===b.set.type&&(c=a.style.width,a.style.width=a.offsetWidth+1+"px",a.offsetWidth+1&&(a.style.width=c))},s.getSet=function(a){var b,c,d,e=!1,f=a[s.ns].sets;for(b=0;b<f.length&&!e;b++)if(c=f[b],c.srcset&&s.matchesMedia(c.media)&&(d=s.supportsType(c.type))){"pending"===d&&(c=d),e=c;break}return e},s.parseSets=function(a,b,d){var e,f,g,h,i=b&&"PICTURE"===b.nodeName.toUpperCase(),j=a[s.ns];(j.src===c||d.src)&&(j.src=w.call(a,"src"),j.src?x.call(a,C,j.src):y.call(a,C)),(j.srcset===c||d.srcset||!s.supSrcset||a.srcset)&&(e=w.call(a,"srcset"),j.srcset=e,h=!0),j.sets=[],i&&(j.pic=!0,l(b,j.sets)),j.srcset?(f={srcset:j.srcset,sizes:w.call(a,"sizes")},j.sets.push(f),g=(q||j.src)&&H.test(j.srcset||""),g||!j.src||k(j.src,f)||f.has1x||(f.srcset+=", "+j.src,f.cands.push({url:j.src,d:1,set:f}))):j.src&&j.sets.push({srcset:j.src,sizes:null}),j.curCan=null,j.curSrc=c,j.supported=!(i||f&&!s.supSrcset||g&&!s.supSizes),h&&s.supSrcset&&!j.supported&&(e?(x.call(a,D,e),a.srcset=""):y.call(a,D)),j.supported&&!j.srcset&&(!j.src&&a.src||a.src!==s.makeUrl(j.src))&&(null===j.src?a.removeAttribute("src"):a.src=j.src),j.parsed=!0},s.fillImg=function(a,b){var c,d=b.reselect||b.reevaluate;a[s.ns]||(a[s.ns]={}),c=a[s.ns],(d||c.evaled!==r)&&((!c.parsed||b.reevaluate)&&s.parseSets(a,a.parentNode,b),c.supported?c.evaled=r:h(a))},s.setupRun=function(){(!S||M||P!==a.devicePixelRatio)&&f()},s.supPicture?(ba=u,s.fillImg=u):!function(){var c,d=a.attachEvent?/d$|^c/:/d$|^c|^i/,e=function(){var a=b.readyState||"";f=setTimeout(e,"loading"===a?200:999),b.body&&(s.fillImgs(),c=c||d.test(a),c&&clearTimeout(f))},f=setTimeout(e,b.body?9:99),g=function(a,b){var c,d,e=function(){var f=new Date-d;b>f?c=setTimeout(e,b-f):(c=null,a())};return function(){d=new Date,c||(c=setTimeout(e,b))}},h=z.clientHeight,i=function(){M=Math.max(a.innerWidth||0,z.clientWidth)!==Q.width||z.clientHeight!==h,h=z.clientHeight,M&&s.fillImgs()};Z(a,"resize",g(i,99)),Z(b,"readystatechange",e)}(),s.picturefill=ba,s.fillImgs=ba,s.teardownRun=u,ba._=s,a.picturefillCFG={pf:s,push:function(a){var b=a.shift();"function"==typeof s[b]?s[b].apply(s,a):(B[b]=a[0],S&&s.fillImgs({reselect:!0}))}};for(;J&&J.length;)a.picturefillCFG.push(J.shift());a.picturefill=ba,"object"==typeof module&&"object"==typeof module.exports?module.exports=ba:"function"=="function"&&__webpack_require__(3)&&!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return ba}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)),s.supPicture||(A["image/webp"]=e("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document);

/***/ }),
/* 6 */,
/* 7 */
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
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($, jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_picturefill__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_picturefill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_picturefill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_throttle_debounce__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_throttle_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_throttle_debounce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_easing__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_easing___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_easing__);
// ! note vendor.js load first

// require("./style_template_default_slider.css");
// require("./style_template_contact_stman_recaptcha.css");






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

// add in /assets-js/app/template_default_slider.js
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

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0), __webpack_require__(0)))

/***/ })
],[9]);