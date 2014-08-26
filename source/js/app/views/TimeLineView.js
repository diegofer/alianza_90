define(function(require){

	"use strict"

	var $         = require('jquery'),
		_         = require('underscore'),
		Backbone  = require('backbone'),
		tpl       = require('text!tpl/TimeLine.html'),

		template  = _.template(tpl);


	return Backbone.View.extend({

		initialize: function() {
			console.log('inicializando SlideView');
			var self = this;

			$(document).ready(function(){
				self.browserHeight = $(window).height(); // Obtenemos la altura del browser
				self.render();
			});
		},

		render: function() {
			this.$el.height(this.browserHeight)
			this.$el.html( template() );
			return this.el;
		},


	});

});