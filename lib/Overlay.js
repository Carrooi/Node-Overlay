// Generated by CoffeeScript 1.6.3
(function() {
  var $, EventEmitter, Overlay, Q, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = window.jQuery || require('jquery');

  Q = require('q');

  EventEmitter = require('events').EventEmitter;

  Overlay = (function(_super) {
    __extends(Overlay, _super);

    function Overlay() {
      _ref = Overlay.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Overlay.ID = '__dk-overlay';

    Overlay.prototype.visible = false;

    Overlay.prototype.color = 'black';

    Overlay.prototype.opacity = 0.8;

    Overlay.prototype.zIndex = 1000;

    Overlay.prototype.duration = 'fast';

    Overlay.prototype.scrollable = false;

    Overlay.prototype.el = null;

    Overlay.prototype.show = function(options) {
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
        this.emit('show', this);
        if (options.scrollable === false) {
          $('body').css('overflow', 'hidden');
        }
        if (this.el === null) {
          if ($('#' + Overlay.ID).length > 0) {
            return Q.reject(new Error('There is already some element with id ' + Overlay.ID + '.'));
          }
          this.el = $('<div>', {
            id: Overlay.ID,
            css: {
              display: 'none',
              position: 'fixed',
              left: 0,
              top: 0,
              width: $(window).width(),
              height: $(window).height()
            },
            click: function(e) {
              return _this.hide();
            }
          }).appendTo($('body'));
        }
        $(window).on('resize.overlay', function(e) {
          return _this.onResize();
        });
        this.el.css({
          backgroundColor: options.color,
          opacity: options.opacity,
          zIndex: options.zIndex
        });
        this.el.fadeIn(options.duration, function() {
          _this.visible = true;
          _this.emit('shown', _this);
          return deferred.resolve(_this);
        });
      } else {
        return Q.reject(new Error('Overlay is already visible'));
      }
      return deferred.promise;
    };

    Overlay.prototype.onResize = function() {
      if (this.visible === true) {
        return this.el.css({
          width: $(window).width(),
          height: $(window).height()
        });
      }
    };

    Overlay.prototype.hide = function() {
      var deferred,
        _this = this;
      deferred = Q.defer();
      if (this.visible === true) {
        this.emit('hide', this);
        this.el.fadeOut(this.duration, function() {
          _this.visible = false;
          _this.emit('hidden', _this);
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

  })(EventEmitter);

  module.exports = new Overlay;

}).call(this);
