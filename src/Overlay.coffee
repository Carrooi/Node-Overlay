$ = window.jQuery || require 'jquery'
Q = require 'q'

class Overlay


	@visible: false

	@color: 'black'

	@opacity: 0.8

	@zIndex: 1000

	@duration: 'fast'

	@scrollable: false

	@el: null


	@show: (options = {}) ->
		deferred = Q.defer()

		if typeof options.color == 'undefined' then options.color = @color
		if typeof options.opacity == 'undefined' then options.opacity = @opacity
		if typeof options.zIndex == 'undefined' then options.zIndex = @zIndex
		if typeof options.duration == 'undefined' then options.duration = @duration
		if typeof options.scrollable == 'undefined' then options.scrollable = @scrollable

		if @visible == false
			if @el == null
				if options.scrollable == false
					$('body').css('overflow', 'hidden')

				@el = $('<div>',
					css:
						display: 'none'
						backgroundColor: options.color
						opacity: options.opacity
						position: 'fixed'
						left: 0
						top: 0
						width: $(window).width()
						height: $(window).height()
						zIndex: options.zIndex
					click: (e) => @hide()
				).appendTo($('body'))

			$(window).on('resize.overlay', (e) => @onResize() )

			@el.fadeIn(options.duration, =>
				@visible = true
				deferred.resolve(@)
			)
		else
			deferred.reject(new Error 'Overlay is already visible')

		return deferred.promise


	@onResize: ->
		if @visible == true
			@el.css(
				width: $(window).width()
				height: $(window).height()
			)


	@hide: ->
		deferred = Q.defer()

		if @visible == true
			@el.fadeOut(@duration,  =>
				@visible = false
				deferred.resolve(@)
			)

			$(window).off('resize.overlay')

			if @scrollable == false
				$('body').css('overflow', 'visible')
		else
			deferred.reject(new Error 'Overlay is not visible')

		return deferred.promise


module.exports = Overlay