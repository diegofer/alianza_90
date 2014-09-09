define(function(require){

	"use strict"

	var $                = require('jquery'),
		_                = require('underscore'),
		Backbone         = require('backbone'),
		jqerySwipe       = require('jquery.touchSwipe'),

		YearItemView     = require('app/views/YearItemView');

	
 

	return Backbone.View.extend({

		tagName   : 'section',
		id        : 'section-timeline',
		className : "clearfix browser-height",

		
		initialize: function(options) {
			console.log('inicializando TimeLineView');

			var numero = (1000 * 20 ) / 100;
			console.log('CALCULO: '+numero);


			
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
			this.$el.height(this.browserHeight);
			//this.$el.css('top', this.browserHeight);
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

			if (contentWidth <= 1366 ) this.slideWidth   = Math.ceil(contentWidth / 4);  //redondeamos por encima

			slides.width(this.slideWidth);
		
			this.$el.append(this.$ul);

			var realWidth = this.getSlideWidth();
			this.timeLineWidth = realWidth * numSlides;  


			slides.each(function(i){
				$(this).css('left', realWidth * i);        // posisionamos los slides 
			});
			
			//this.rightMax = this.timeLineWidth - contentWidth;
			this.$ul.width(this.timeLineWidth);


			this.activeSwipe();
		},

		


		animarTimeSlide: function(e) {
	
			var ancho = this.$el.outerWidth(),
			    numBajo = (ancho * 25 ) / 100,
			    numAlto = ancho - numBajo,
			    mousePos  = e.pageX;

			//console.log("mousepos: "+mousePos+" numAlto: "+numAlto);

			// finalizar movimiento
			if (mousePos > numBajo && mousePos < numAlto) {
				this.onEfect.timeline = false;
				this.$ul.stop(true, false);
			};

			// mover a la izquierda
			if (mousePos <= numBajo && !this.onEfect.timeline) {
				this.onEfect.timeline = true;
				var self = this;

				this.$ul.animate(
					{right: 0}, 
					1500, 
					function(){
						self.onEfect.timeline = false;
					}

				);
			}

			// mover a la derecha
			if (mousePos >= numAlto && !this.onEfect.timeline) {
			
				this.onEfect.timeline = true;
				var self = this;

				this.$ul.animate(
					{right: self.maxRight()}, 
					1500, 
					function(){
						self.onEfect.timeline = false;
					}

				);
			};

			

		},

		activeSwipe: function() {
			var self = this,
				mov  = $.fn.swipe.directions;
				console.log(mov);

			this.$el.swipe({
				swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
					//console.log('HOLA SOY SWIPE');
				    if (direction === mov.RIGHT) moveLeft();
				    if (direction === mov.LEFT) moveRight();
				}
			});

			function moveRight() {
				self.$ul.animate(
					{right: self.maxRight()}, 
					1500, 
					function(){
						self.onEfect.timeline = false;
					}
				);
			}

			function moveLeft() {
				
				self.$ul.animate(
					{right: 0}, 
					1500, 
					function(){
						self.onEfect.timeline = false;
					}
				);
			}
		},


		onMouseEnter: function(event) {
			var realWidth = this.$ul.children().eq(0).outerWidth(true);
			//console.log(realWidth);

			//if (this.onEfect.slide) return;
			//console.log('ESTOY EN ENTER');			
			//var width = this.$ul.outerWidth(true),
			//var self = this;
			
			//this.onEfect.slide = true;
			//this.$ul.width(width+50);   // hacemos espacio para el aumento del slide

			//this.$ul.animate({width: "+=50"}, { duration: 400, queue: false });
			// $(event.currentTarget).animate({width: "+=50"},{ duration: 400, queue: false });
			// $(this.$ul).animate({width: "+=50"},{ duration: 400, queue: false });


			// 400, function(){
			// 	self.onEfect.slide = false;
			// });

			//var liActual=$(event.currentTarget);

			// $(event.currentTarget).animate({
			// 	width: "+=100px"
			// }, 400, function(){
			// 	//PRUEBA DE REACOMODACION DE SLIDES	

			// 	// var slides       = self.$ul.children(); 				
			// 	// slides.each(function(i){					
			// 	// var actual=	$(this);
			// 	// var leftActual=parseInt(actual.css('left'));
			// 	// var leftLiActual=parseInt(liActual.css('left'));
			// 	// console.log(width+" > "+liActual.css('left'));
			// 	// //console.log(+" > "+liActual.css('left'));
			// 	// 		if(leftActual > leftLiActual){ // solo tomo los elementos mayores que el actual para cambiar el left
			// 	// 			actual.css('left',"+=50px");//incremento en 50 la pos de los otros li							
			// 	// 		}else {
			// 	// 			actual.css('left',"-=50px");//incremento en 50 la pos de los otros li	
			// 	// 		}
			// 	// });		
			// 	self.onEfect.slide = false;
			// });
		},


		onMouseLeave: function(event) {	

			// var width = this.$ul.outerWidth(true),
			//var self = this;
			
			//this.onEfect.slide = true;
			//this.$ul.width(width+50);   // hacemos espacio para el aumento del slide

			
			// $(event.currentTarget).animate({width: "-=50"},{ duration: 400, queue: false });
			// $(this.$ul).animate({width: "-=50"},{ duration: 400, queue: false });
			//this.$ul.animate({width: self.timeLineWidth}, { duration: 400, queue: false });

			//if (this.onEfect.slide) return;
			// console.log('ESTOY EN LEAVE');
			// this.onEfect.slide = true;
			// var self = this;
			// var liActual=$(event.currentTarget);
			// $(event.currentTarget).animate({
			// 	width: self.slideWidth
			// }, 400, function(){
			// 	var width = self.$ul.outerWidth(true);
			// 	//console.log(width);
			// 	self.$ul.width(width-100);				
			// 	var slides = self.$ul.children(); 				
			// 	slides.each(function(i){					
			// 	var actual=	$(this);
			// 	var leftActual=parseInt(actual.css('left'));
			// 	var leftLiActual=parseInt(liActual.css('left'));				
			// 			if(leftActual > leftLiActual){ // solo tomo los elementos mayores que el actual para cambiar el left
			// 				actual.css('left',"-=50px");//incremento en 50 la pos de los otros li							
			// 			}	
			// 			else {
			// 				actual.css('left',"+=50px");//incremento en 50 la pos de los otros li	
			// 			}	
			// 	});	
			// 	self.onEfect.slide = false;
			// });
		},

		//######## utiles  #########//

		getSlideWidth: function() {
			return this.$ul.children().eq(0).outerWidth();	
		},

		maxRight: function() {
			return this.timeLineWidth - this.$el.width(); // retorna el punto maximo hasta donde puede moverse el carrousel
		},

		onClose: function() {
	        _(this.childViews).each(function(view) {
        		view.close();
      		});
	    },




	});

});