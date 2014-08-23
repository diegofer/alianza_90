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