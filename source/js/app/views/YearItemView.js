define(function (require) {

	"use strict";

	var $           = require('jquery'),
	    _           = require('underscore'),
		Backbone    = require('backbone'),
		tpl         = require('text!tpl/YearItem.html'),

		template    = _.template(tpl);




	return  Backbone.View.extend({

		tagName: 'li',

		initialize: function() {		
			console.log('inicializando YearView');
		},
		

		render: function() {
			//console.log(this.model.toJSON());
			this.$el.html( template( this.model.toJSON() ) );		
    		return this.el;
		},


	});

});