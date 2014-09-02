define(function (require) {

	"use strict";

	var $             = require('jquery'),
	    _             = require('underscore'),
		Backbone      = require('backbone'),
			
	    carouFredSel  = require('src/carouFredSel/jquery.carouFredSel-min'),
	    NivoLightbox  = require('src/Nivo-Lightbox/nivo-lightbox.min'),
	    swig          = require('swig'),    
	    tpl           = require('text!tpl/YearDetalle.html'),

	    template      =  swig.compile(tpl);

		//template    = _.template(tpl);
		

		




	return  Backbone.View.extend({

		tagName  : 'article',
		id       : 'year',


		initialize: function(options) {		
			console.log('inicializando YearDetalleView');
			this.contenedorId = options.contenedorId;
			

			var self = this;

			$(document).ready(function(){
				self.browserHeight = $(window).height(); // Obtenemos la altura del browser
				self.browserWidth  = $(window).width();
				self.render();
			});
		},
		

		render: function() {
			//console.log(this.model.toJSON());
			this.$el.html( template(this.model.toJSON() ) );

			if (this.browserWidth >= 768 ) this.$el.find('.browser-height').height(this.browserHeight);
					
    		$(this.contenedorId).html(this.el);
    		this.setCarrousel();
		},


		setCarrousel: function() {
			var $elem = this.$el.find('#year-slide'),  // Obtenemos el contenedor
				width = $elem.width() / 2,                 // obtenemos su width dividido por 2
				$li   = $elem.find('li').width(width);     // le pasamos el width a cada slide

			this.$el.find('#carousel').carouFredSel({
				responsive: true,
				width: '100%',
    			prev: '#prev2',
				next: '#next2',
				auto: false,

				scroll: 1,
				items: {
					visible: {
						min: 2,
						max: 2
					}
				}
    		});

    		this.$el.find('#year-slide .destacar').nivoLightbox();
		}


	});

});