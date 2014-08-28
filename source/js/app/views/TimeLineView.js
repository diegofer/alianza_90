define(function(require){

	"use strict"

	var $                = require('jquery'),
		_                = require('underscore'),
		Backbone         = require('backbone'),

		YearItemView         = require('app/views/YearItemView');

	
 

	return Backbone.View.extend({

		tagName   : 'section',
		id        : 'section-timeline',
		className : "clearfix browser-height",

		initialize: function(options) {
			console.log('inicializando TimeLineView');
			this.contenedorId = options.contenedorId;
			this.childViews = [];
			var self = this;

			$(document).ready(function(){
				self.browserHeight = $(window).height(); // Obtenemos la altura del browser
				self.render();
			});

			
		},

		events: {
			'mousemove'  : 'animarTimeSlide',
			'mouseenter li'  : 'onMouseEnter',
			'mouseleave li'  : 'onMouseLeave',
		},

		render: function() {
			this.$el.height(this.browserHeight)
			$(this.contenedorId).append(this.el);
			this.renderChildren();
		},

		renderChildren: function() {
			var $ul = $('<ul>');
			console.log($ul);
			_.each(this.collection.models, function(year){
				var yearItemView = new YearItemView({model: year});

				$ul.append( yearItemView.render() );
				this.childViews.push(yearItemView);   // Almacenamos las childviews para luego poder eliminarlas
			}, this);
			this.$el.html($ul);
		},

		animarTimeSlide: function(e) {
			//console.log(e.offsetX);
			console.log(e.pageX);

		},


		onMouseEnter: function(event) {
			$(event.currentTarget).animate({
				width: "350px"
			}, 400);
		},


		onMouseLeave: function(event) {
			$(event.currentTarget).animate({
				width: "300px"
			}, 400);
		},


		onClose: function() {
	        _(this.childViews).each(function(view) {
        		view.close();
      		});
	    },




	});

});