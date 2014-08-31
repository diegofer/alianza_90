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
			this.onEfect = {
				timeline : false,
				slide    : {
					onEnter: false,
					onLeave: false,
				}
			};
			
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
			this.$ul = $('<ul>');
	
			_.each(this.collection.models, function(year){
				var yearItemView = new YearItemView({model: year});
				this.$ul.append( yearItemView.render() );
				this.childViews.push(yearItemView);   // Almacenamos las childviews para luego poder eliminarlas
			}, this);

			//definimos anchos del ul de acuerdo a la pantalla
			var numSlides    = this.childViews.length;
			var contentWidth = this.$el.width();
			this.timeLineWidth = 0;
			this.slideWidth   = 300;
			var slides       = this.$ul.children(); 
			if (contentWidth <= 1366 ) this.slideWidth   = contentWidth / 4;

			slides.width(''+this.slideWidth+'');

			
		
			this.$el.html(this.$ul);
			var realWidth = this.$ul.children().eq(0).outerWidth(true);
			console.log(realWidth);
			slides.each(function(i){
				console.log(i* realWidth);
			});
			
			this.timeLineWidth = realWidth * numSlides;
			this.rightMax = this.timeLineWidth - contentWidth;
			this.$ul.width(''+this.timeLineWidth +'');
			
			console.log(realWidth);
			console.log(this.timeLineWidth);
			
			
			
			
			

			// var timeLineWidth = (numSlides * 300) + numSlides ;

			// this.$ul.width(''+timeLineWidth +'');
			// this.$el.html(this.$ul);
		},

		animarTimeSlide: function(e) {

			
			if (this.onEfect.timeline) return;
			//console.log(e.offsetX);
			console.log(e.pageX);

			this.onEfect.timeline = true;
			var self = this;
			// this.$ul.animate(
			// 	{right: self.rightMax}, 
			// 	1000, 
			// 	function(){
			// 		self.onEfect.timeline = false;
			// 	}

			// );

		},


		onMouseEnter: function(event) {

			//if (this.onEfect.slide) return;
			console.log('ESTOY EN ENTER');
			var width = this.$ul.outerWidth(true);

			this.onEfect.slide = true;
			var self = this;

			this.$ul.width(width+50);   // hacemos espacio para el aumento del slide

			$(event.currentTarget).animate({
				width: "+=50px"
			}, 400, function(){
				//self.$ul.finish();  // Finalizamos la animacion en el timeline
				self.onEfect.slide = false;
			});
		},


		onMouseLeave: function(event) {	

			//if (this.onEfect.slide) return;
			console.log('ESTOY EN LEAVE');
			this.onEfect.slide = true;
			var self = this;

			$(event.currentTarget).animate({
				width: self.slideWidth
			}, 400, function(){
				var width = self.$ul.outerWidth(true);
				console.log(width);
				self.$ul.width(width-50)
				self.onEfect.slide = false;
			});
		},


		onClose: function() {
	        _(this.childViews).each(function(view) {
        		view.close();
      		});
	    },




	});

});