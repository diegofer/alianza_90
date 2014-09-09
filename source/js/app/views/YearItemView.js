define(function (require) {

	"use strict";

	var $           = require('jquery'),
	    _           = require('underscore'),
		Backbone    = require('backbone'),
		tpl         = require('text!tpl/YearItem.html'),
		jqerySwipe  = require('jquery.touchSwipe'),

		template    = _.template(tpl);




	return  Backbone.View.extend({

		tagName: 'li',
		//className: 'noSwipe',

		initialize: function() {		
			console.log('inicializando YearView');

			var self = this;
			this.$el.swipe({
				tap:function(event, target) {
					self.goTo();
				}
			})
		},

		events: {
			'click': 'goTo'
		},
		

		render: function() {
			this.$el.html( template( this.model.toJSON() ) );		
    		return this.el;
		},

		goTo: function() {
			router.navigate(''+this.model.get('year'), true);
		},

		onClose: function() {
			this.$el.swipe("destroy");
	    },


	});

});