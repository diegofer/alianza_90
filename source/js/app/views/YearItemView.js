define(function (require) {

	"use strict";

	var $           = require('jquery'),
	    _           = require('underscore'),
		Backbone    = require('backbone'),
		tpl         = require('text!tpl/YearItem.html'),

		template    = _.template(tpl);




	return  Backbone.View.extend({

		tagName: 'li',
		//className: 'noSwipe',

		initialize: function() {		
			console.log('inicializando YearView');
		},

		events: {
			//'click': 'alClick'
		},
		

		render: function() {
			this.$el.html( template( this.model.toJSON() ) );		
    		return this.el;
		},

		alClick: function() {
			router.navigate('year/'+ this.model.get('year'), true);
		}


	});

});