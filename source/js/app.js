require.config({
	baseUrl: 'js/lib', // Esta url determina todo

	paths: {
		app: '../app',
		tpl: '../tpl',
		src: '../../src',
	},

	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},

		'jquery.hoverIntent'                                      : ['jquery'],
		'src/customScrollbar/jquery.mCustomScrollbar.concat.min'  : ['jquery'],
		'src/carouFredSel/jquery.carouFredSel-min'                : ['jquery'],
		'src/Nivo-Lightbox/nivo-lightbox.min'                     : ['jquery']
	},

	urlArgs: "bust=" + (new Date()).getTime(),

});

require([
	'jquery',
	'backbone', 
	'app/model/YearsCollection',
	'app/Router'
	], 

	function ($, Backbone, YearsCollection, Router) {

		$(document).ajaxStart(function(){
	        console.log('empezo ajax');
	        $('.spiner').show();
	    }).ajaxStop(function(){
	        console.log('termino ajax');
	        $('.spiner').hide();
	    });


		// Metodo para liberar memoria y remover vistas
		Backbone.View.prototype.close = function() {
	        console.log('cerrando view ' + this.cid);

	        if (this.onClose) this.onClose();            

	        this.remove();
	        this.unbind();   
	    };


	    var yearsCollection = new YearsCollection();
		yearsCollection.once('sync', initRouter);
		yearsCollection.fetch();


		function initRouter(data) {
			window.router = new Router({years:data});
		    Backbone.history.start();
		}

	}
	
);