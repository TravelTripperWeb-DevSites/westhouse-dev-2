/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _rt_offer_popup_widget = __webpack_require__(1);

var _rt_offer_popup_widget2 = _interopRequireDefault(_rt_offer_popup_widget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var css = __webpack_require__(2);


(function ($) {
	//plugin setup

	$.fn.RTwidgets = function (options) {
		//default options 
		var defaults = {
			hotel_id: 'NYCROY',
			portal_id: 'royaltonhotel',
			locale: 'en',
			currency: 'USD',
			offer_popup_widget: {
				show: true,
				header_title: 'LIMITED TIME OFFER',
				primary_color: '#33a1cc',
				secondary_color: '#616161',
				overlay_text_color: '#ffffff',
				offer_popup_type: 'reztrip',
				offer_data_url: 'http://localhost:3000/special-offer-popup.json',
				offer_btn_label: "Reserve",
				rt_offer_code: 'DISAP',
				show_detail: false,
				timeout: 5000
			}
		};

		var widget_settings = $.extend(true, {}, defaults, options); //overwrite with settings

		var popup_widget = new _rt_offer_popup_widget2.default(widget_settings);
		if (widget_settings.offer_popup_widget.show) {
			//if popup offer widget true 
			popup_widget.show_widget();
		} else {
			popup_widget.show_widget();
		}
	};
})(jQuery);

 
/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Offer Popup will show based on session 
 */
var rt_offer_popup_widget = function () {
  function rt_offer_popup_widget(options) {
    _classCallCheck(this, rt_offer_popup_widget);

    this.settings = {};
    this.settings.offer_popup_widget = {};

    this.settings.hotel_id = options.hotel_id || 'NYCROY';
    this.settings.portal_id = options.portal_id || 'royaltonhotel';
    this.settings.locale = options.locale || 'en';
    this.settings.currency = options.currency || 'USD';
    this.settings.primary_color = options.primary_color || '#33a1cc';
    this.settings.secondary_color = options.secondary || '#616161';
    this.settings.overlay_text_color = options.overlay_text_color || '#ffffff';
    this.settings.offer_popup_widget.header_title = options.offer_popup_widget.header_title || 'Exclusive Offer';
    this.settings.offer_popup_widget.offer_popup_type = options.offer_popup_widget.offer_popup_type || 'data-models';
    this.settings.offer_popup_widget.offer_data_url = options.offer_popup_widget.offer_data_url || null;
    this.settings.offer_popup_widget.btn_label = options.offer_popup_widget.offer_btn_label || 'Reserve';
    this.settings.offer_popup_widget.rt_offer_code = options.offer_popup_widget.rt_offer_code || null;
    this.settings.offer_popup_widget.show_detail = options.offer_popup_widget.show_detail || false;
    this.settings.offer_popup_widget.timeout = options.offer_popup_widget.timeout || 5000;
  }

  _createClass(rt_offer_popup_widget, [{
    key: 'show_widget',
    value: function show_widget() {
      //show the animated offer popup widget
      var url = void 0;
      if (this.settings.offer_popup_widget.offer_popup_type == 'reztrip' && this.settings.offer_popup_widget.offer_data_url == null) {
        url = 'https://rt3api-prd.ttaws.com/hotels/special_rates.json?hotel_id=' + this.settings.hotel_id + '&portal_id=' + this.settings.portal_id + '&locale=' + this.settings.locale + '&currency=' + this.settings.currency;
      } else {
        url = this.settings.offer_popup_widget.offer_data_url + '?callback=?';
      }
      var _this = this;
      $.ajax({
        url: url,
        jsonpCallback: 'jsonCallback',
        contentType: _this.settings.offer_popup_widget.offer_data_url != null ? 'application/json' : '',
        dataType: _this.settings.offer_popup_widget.offer_data_url != null ? 'jsonp' : 'json',
        success: function success(data, status) {

          if (data.special_rates.length > 0) {
            data.special_rates.forEach(function (item) {
              var detail_offer = '';
              if (item.rate_plan_code == _this.settings.offer_popup_widget.rt_offer_code) {
                if (_this.settings.offer_popup_widget.show_detail) {
                  detail_offer = '<div class="popup-detail-offer">' + item.short_description + '</div>';
                }
                var view_template = '<div class="rt-guest-widget pop_offer">\n\t\t\t\t\t\t\t\t\t\t\t\t    <div class="rt-widget-header">\n\t\t\t\t\t\t\t\t\t\t\t\t    \t<h3>' + _this.settings.offer_popup_widget.header_title + '</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t    \t<span class="widget_popup_close" id="rt_pop_close">&times;</span>\n\t\t\t\t\t\t\t\t\t\t\t\t    </div> \n\t\t\t\t\t\t\t\t\t\t\t\t    ' + detail_offer + '\n\t\t\t\t\t\t\t\t\t\t\t\t    <div class="body_content" style="background-image: url(\'' + item.lead_photo_url.yankee_large + '\');"><div class="rt-overlay_widget"><div class="popup_detail"><a href="' + item.promo_url + '" target="_blank">' + item.rate_plan_name + '</a></div></div></div><a href="' + item.promo_url + '" class="widget-booknow-link" target="_blank">' + _this.settings.offer_popup_widget.btn_label + '</a></div><div class="rt-guest-widget open-offer-popup"><span>&rarr;</span></div>';

                setTimeout(function () {
                  return $('body').append(view_template);
                }, _this.settings.offer_popup_widget.timeout);
              }
            });
          }
        }
      });

      $(document).on('click', '#rt_pop_close', function (e) {
        $('.rt-guest-widget.pop_offer').hide('slow');
        $('.rt-guest-widget.open-offer-popup').addClass('active-open');
      });
      $(document).on('click', '.open-offer-popup', function (e) {
        $('.rt-guest-widget.pop_offer').show('slow');
        $('.rt-guest-widget.open-offer-popup').removeClass('active-open');
      });
    }
  }]);

  return rt_offer_popup_widget;
}();

exports.default = rt_offer_popup_widget;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);