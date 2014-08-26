define(function (require) {

	"use strict";

	var $           = require('jquery'),
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
		
  //       events: {
  //           "click": "alClick",
  //       },

		render: function() {
			this.$el.height(this.browserHeight)
			this.$el.html( template() );		
    		return this.el;
		},

		// alClick: function() {
		// 	$('#list-sedes').find('.list-group-item').removeClass('active');
		// 	this.$el.find('.list-group-item').addClass('active');
		// }


	});

});