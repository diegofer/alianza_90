define(function (require) {

	"use strict";

	var $                = require('jquery'),
		Backbone         = require('backbone'),

		HomeView          = require('app/views/HomeView');


	return Backbone.Router.extend({

		initialize: function() {
			console.log('iniciando router');

			$(window).resize(this.updateSize);     // When the browser changes size
		},

		routes: {
			'':    'inicio'
		},

		inicio: function() {
			var homeView = new HomeView({
				el: $('#section-home')
			});
		},

		updateSize: function() {
		    var height = $(window).height();
		    $('.browser-height').height(height);
		},


	});

});