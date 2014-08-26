define(function (require) {

	"use strict";

	var $           = require('jquery'),
		hoverIntent  = require('jquery.hoverIntent'),
	    _           = require('underscore'),
		Backbone    = require('backbone'),
		tpl         = require('text!tpl/Home.html'),

		template    = _.template(tpl);




	return  Backbone.View.extend({

		initialize: function() {		
			console.log('inicializando Homeiew');

			var self = this;

			$(document).ready(function(){
				self.browserHeight = $(window).height(); // Obtenemos la altura del browser
				self.render();
			});

		},
		

		render: function() {
			this.$el.height(this.browserHeight)
			this.$el.html( template() );	

			var $element = this.$el.find('#info-home');
			$element.hoverIntent(this.alHoverIntentIn, this.alHoverIntentOut);
			
    		return this.el;
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