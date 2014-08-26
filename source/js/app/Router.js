define(function (require) {

	"use strict";

	var $                = require('jquery'),
		Backbone         = require('backbone'),

		HomeView          = require('app/views/HomeView'),
		TimeLineView      = require('app/views/TimeLineView'),
		HeaderView        = require('app/views/HeaderView');


	return Backbone.Router.extend({

		initialize: function() {
			console.log('iniciando router');

			var headerView = new HeaderView({ el: $('header')});

			$(window).resize(this.updateSize);     // When the browser changes size
		},

		routes: {
			''           :'inicio',
			'timeline'   : 'timeline'
		},


		inicio: function() {
			var homeView = new HomeView({
				el: $('#section-home')
			});

			var timeLineView = new TimeLineView({
				el: $('#section-timeline')
			});
			
			homeView.on('scrollgo', function(argumento){
				console.log(argumento)
			}, this);
		},

		timeline: function() {

		},

		updateSize: function() {
		    var height = $(window).height();
		    $('.browser-height').height(height);
		},


	});

});