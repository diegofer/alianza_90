define(function (require) {

	"use strict";

	var $           = require('jquery'),
		hoverIntent  = require('jquery.hoverIntent'),
	    _           = require('underscore'),
		Backbone    = require('backbone'),
		tpl         = require('text!tpl/Home.html'),

		template    = _.template(tpl);




	return  Backbone.View.extend({

		tagName   : 'section',
		id        : 'section-home',
		className : "clearfix browser-height",


		initialize: function(options) {		
			console.log('inicializando Homeiew');

			this.contenedorId = options.contenedorId;

			var self = this;

			$(document).ready(function(){
				self.browserHeight = $(window).height(); // Obtenemos la altura del browser
				self.render();
			});

		},
		

		render: function() {
			this.$el.height(this.browserHeight)
			this.$el.html( template() );	
			$(this.contenedorId).append(this.el);

			var $element = this.$el.find('#info-home');
			$element.hoverIntent(this.alHoverIntentIn, this.alHoverIntentOut);
		},


		alHoverIntentIn: function() {
			var pos = $("#section-timeline").position().top;
		    $("body, html").animate({ 
		    	scrollTop: pos }, 1500);
		},


		alHoverIntentOut: function() {
			//console.log('SOY HOVERINTENT OUT')
		},   
		


	});

});