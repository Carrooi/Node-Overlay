// Generated by CoffeeScript 1.6.3
(function() {
  var $, Overlay, Q;

  $ = window.jQuery || require('jquery');

  Q = require('q');

  Overlay = (function() {
    function Overlay() {}

    Overlay.visible = false;

    Overlay.color = 'black';

    Overlay.opacity = 0.8;

    Overlay.zIndex = 1000;

    Overlay.duration = 'fast';

    Overlay.scrollable = false;

    Overlay.el = null;

    Overlay.show = function(options) {
      var deferred,
        _this = this;
      if (options == null) {
        options = {};
      }
      deferred = Q.defer();
      if (typeof options.color === 'undefined') {
        options.color = this.color;
      }
      if (typeof options.opacity === 'undefined') {
        options.opacity = this.opacity;
      }
      if (typeof options.zIndex === 'undefined') {
        options.zIndex = this.zIndex;
      }
      if (typeof options.duration === 'undefined') {
        options.duration = this.duration;
      }
      if (typeof options.scrollable === 'undefined') {
        options.scrollable = this.scrollable;
      }
      if (this.visible === false) {
        if (this.el === null) {
          if (options.scrollable === false) {
            $('body').css('overflow', 'hidden');
          }
          this.el = $('<div>', {
            css: {
              display: 'none',
              backgroundColor: options.color,
              opacity: options.opacity,
              position: 'fixed',
              left: 0,
              top: 0,
              width: $(window).width(),
              height: $(window).height(),
              zIndex: options.zIndex
            },
            click: function(e) {
              return _this.hide();
            }
          }).appendTo($('body'));
        }
        $(window).on('resize.overlay', function(e) {
          return _this.onResize();
        });
        this.el.fadeIn(options.duration, function() {
          _this.visible = true;
          return deferred.resolve(_this);
        });
      } else {
        deferred.reject(new Error('Overlay is already visible'));
      }
      return deferred.promise;
    };

    Overlay.onResize = function() {
      if (this.visible === true) {
        return this.el.css({
          width: $(window).width(),
          height: $(window).height()
        });
      }
    };

    Overlay.hide = function() {
      var deferred,
        _this = this;
      deferred = Q.defer();
      if (this.visible === true) {
        this.el.fadeOut(this.duration, function() {
          _this.visible = false;
          return deferred.resolve(_this);
        });
        $(window).off('resize.overlay');
        if (this.scrollable === false) {
          $('body').css('overflow', 'visible');
        }
      } else {
        deferred.reject(new Error('Overlay is not visible'));
      }
      return deferred.promise;
    };

    return Overlay;

  })();

  module.exports = Overlay;

}).call(this);