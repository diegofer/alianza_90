define(function (require) {

	"use strict";

	var $               = require('jquery'),
	    _               = require('underscore'),
		Backbone        = require('backbone'),
			
	    customScrollbar = require('src/customScrollbar/jquery.mCustomScrollbar.concat.min'),
	    carouFredSel    = require('src/carouFredSel/jquery.carouFredSel-min'),
	    NivoLightbox    = require('src/Nivo-Lightbox/nivo-lightbox.min'),
	    swig            = require('swig'),    
	    tpl             = require('text!tpl/YearDetalle.html'),

	    template        =  swig.compile(tpl),

	    $head = $('head');


	return  Backbone.View.extend({

		tagName  : 'article',
		id       : 'year',


		initialize: function(options) {		
			console.log('inicializando YearDetalleView');
			this.contenedorId = options.contenedorId;

			var year   = this.model.get('year');
			var title  = this.model.get('subtitle');
			var desc   = this.model.get('review_1').substr(0, 150);
			var descript = desc.replace(/<\/?[^>]+(>|$)/g, "");   

			var metas = '<meta class="mis-metas" property="og:title"       content="'+title+'" />';
			metas    += '<meta class="mis-metas" property="og:type"        content="website" />';
			metas    += '<meta class="mis-metas" property="og:site_name"   content="Alianza 90" />';
			metas    += '<meta class="mis-metas" property="og:image"       content="http://laalianzacristiana.co/alianza90/img/fotos/'+year+'/imgtop_'+year+'.jpg" />';
			metas    +=	'<meta class="mis-metas" property="og:description" content="'+descript+'">';
			metas    += '<meta class="mis-metas" property="og:url"         content="http://laalianzacristiana.co/alianza90/#/'+year+'">';

			$head.append(metas);
			

			var self = this;

			$(document).ready(function(){
				self.browserHeight = $(window).height(); // Obtenemos la altura del browser
				self.browserWidth  = $(window).width();
				self.render();
			});
		},
		

		render: function() {
			this.$el.html( template(this.model.toJSON() ) );

			if (this.browserWidth >= 768 ) this.$el.find('.browser-height').height(this.browserHeight);
					
    		$(this.contenedorId).append(this.el);

    		$(".hacer-scroll").mCustomScrollbar({      // setear scroll en texto
				theme:"dark-2",
				scrollButtons:{
					enable:false
				}
			});

    		var self = this;  
			this.$el.find('#img1').load(function(){    // activar carrusel cuando primer imagen este disponible
				self.setCarrousel();
			});
		},


		setCarrousel: function() {
			var $elem        = this.$el.find('#year-slide'),  // Obtenemos el contenedor
				widthSlide   = $elem.width() / 2,                 // obtenemos su width dividido por 2
				$li          = $elem.find('li').width(widthSlide),     // le pasamos el width a cada slide
				$carrusel    = this.$el.find('#carousel');

			$carrusel.carouFredSel({
				responsive: true,
				width: '100%',
				//height: 'auto',
    			prev: '#prev2',
				next: '#next2',
				auto: true,

				scroll: {
					items           : 1,
		            duration        : 1000,                         
		            pauseOnHover    : true
				},
				items: {
					//width: widthSlide,
					height: 'auto',
					visible: {
						min: 2,
						max: 2
					}
				}
    		});

    		$carrusel.swipe({
				excludedElements: "button, input, select, textarea, .noSwipe",
				swipeLeft: function() {
					$carrusel.trigger('next', 1);
				},
				swipeRight: function() {
					$carrusel.trigger('prev', 1);
				},
				tap: function(event, target) {
					window.open($(target).closest('.carusel-cnt').find('carusel-cnt-link').attr('href'), '_self');
				}
			});

    		this.$el.find('.destacar').nivoLightbox({
    			effect: 'fadeScale', 
    		});
		},

		onClose: function() {
			FB._initialized = false;
			$head.find('.mis-metas').remove();
	    }


	});

});