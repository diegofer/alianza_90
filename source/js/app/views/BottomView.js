define(function (require) {

	"use strict";

	var $           = require('jquery'),
	    _           = require('underscore'),
		Backbone    = require('backbone'),
		tpl         = require('text!tpl/Bottom.html'),

		template    = _.template(tpl);




	return  Backbone.View.extend({

		tagName   : 'section',
		id        : 'section-bottom',
		className : "clearfix",


		initialize: function(options) {		
			console.log('inicializando VideoView');

			this.contenedorId = options.contenedorId;

			 var self = this;

			$(document).ready(function(){
				self.browserHeight = $(window).height(); // Obtenemos la altura del browser
				self.browserWidth  = $(window).width();
				self.render();
			});

		},
		

		render: function() {
			if (this.browserWidth >= 768) {
		    	 this.$el.css('min-height',  this.browserHeight);
		    };

			this.$el.html( template() );	
			$(this.contenedorId).append(this.el);

		},


		


	});

});