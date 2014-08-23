require.config({
	baseUrl: 'js/lib', // Esta url determina todo

	paths: {
		app: '../app',
		tpl: '../tpl',
		src: '../../src'
	},

	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		}
	},

	urlArgs: "bust=" + (new Date()).getTime(),

});

require([
	'jquery',
	'backbone', 
	'app/Router'
	], 

	function ($, Backbone, Router) {


		// Metodo para liberar memoria y remover vistas
		Backbone.View.prototype.close = function() {
	        console.log('cerrando view ' + this.cid);

	        if (this.onClose) this.onClose();            

	        this.remove();
	        this.unbind();   
	    };



		window.router = new Router();
	    Backbone.history.start();
	}
	
);