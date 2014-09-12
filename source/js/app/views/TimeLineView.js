define(function(require){

	"use strict"

	var $                = require('jquery'),
		_                = require('underscore'),
		Backbone         = require('backbone'),

		carouFredSel     = require('src/carouFredSel/jquery.carouFredSel-min'),	
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
			//'mouseenter li'  : 'onMouseEnter',
			//'mouseleave li'  : 'onMouseLeave',
		},

		render: function() {
			this.$el.height(this.browserHeight);
			//this.$el.css('top', this.browserHeight);
			$(this.contenedorId).append(this.el);
			this.renderChildren();
		},

		renderChildren: function() {
			this.$carrusel = $('<ul id="carrusel">');
	
			_.each(this.collection.models, function(year){
				var yearItemView = new YearItemView({model: year});
				this.$carrusel.append( yearItemView.render() );
				this.childViews.push(yearItemView);   // Almacenamos las childviews para luego poder eliminarlas
			}, this);

	
			this.$el.append(this.$carrusel);

			var self = this;  
			this.$carrusel.find('#img-1920').load(function(){    // activar carrusel cuando primer imagen este disponible
				self.setCarrusel();
				
			});
		},


		setCarrusel: function(){
			this.$carrusel.carouFredSel({
				responsive: true,
				
				circular: false,
				infinite:false,

				scroll: {
					play: false,
					items: 1,
					easing: 'linear'
				},

				items: {
					visible: {
						min: 1.5,
						max: 4.5
					},
					//height: '100%',
					//width: 'auto'
				}
    		});

    		this.setSwipe();
		},


		setSwipe: function() {
			var self = this;
			this.$carrusel.swipe({

				excludedElements: "button, input, select, textarea, .noSwipe",

				swipeLeft: function() {
					self.$carrusel.trigger('next', 1);
				},

				swipeRight: function() {
					self.$carrusel.trigger('prev', 1);
				},

				tap: function(event, target) {
					window.open($(target).closest('.carusel-cnt').find('carusel-cnt-link').attr('href'), '_self');
				}
			});
		},

		


		animarTimeSlide: function(e) {
	
			var ancho = this.$el.outerWidth(),
			    numBajo = (ancho * 25 ) / 100,
			    numAlto = ancho - numBajo,
			    mousePos  = e.pageX;

			//console.log("mousepos: "+mousePos+" numAlto: "+numAlto);

			//finalizar movimiento
			if (mousePos > numBajo && mousePos < numAlto) {
				this.onEfect.timeline = false;
				//this.$ul.stop(true, false);
			};

			// mover a la izquierda
			if (mousePos <= numBajo && !this.onEfect.timeline) {
				var self = this;
				this.onEfect.timeline = true;

				this.$carrusel.trigger('prev',{
					items: 1, 
					onAfter: function(){
						self.onEfect.timeline = false;
					}
				});
			}

			// mover a la derecha
			if (mousePos >= numAlto && !this.onEfect.timeline) {
				var self = this;
				this.onEfect.timeline = true;

				this.$carrusel.trigger('next',{
					items: 1, 
					onAfter: function(){
						self.onEfect.timeline = false;
					}
				});
			};


		},



		//######## utiles  #########//

		getSlideWidth: function() {
			return this.$ul.children().eq(0).outerWidth();	
		},

		maxRight: function() {
			return this.timeLineWidth - this.$el.width(); // retorna el punto maximo hasta donde puede moverse el carrousel
		},

		onClose: function() {
			this.$el.swipe("destroy");
	        _(this.childViews).each(function(view) {
        		view.close();
      		});
	    },




	});

});