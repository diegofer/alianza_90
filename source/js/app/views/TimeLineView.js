define(function(require){

	"use strict"

	var $                = require('jquery'),
		_                = require('underscore'),
		Backbone         = require('backbone'),

		YearView         = require('app/views/YearView');

	
 

	return Backbone.View.extend({

		initialize: function() {
			console.log('inicializando TimeLineView');
			this.childViews = [];
			var self = this;

			console.log(this.collection.models);
			$(document).ready(function(){
				self.browserHeight = $(window).height(); // Obtenemos la altura del browser
				self.render();
			});

			
		},

		events: {
			'mousemove'  : 'animarTimeSlide'
		},

		render: function() {
			this.$el.height(this.browserHeight)
			this.renderChildren();
		},

		renderChildren: function() {
			var $ul = this.$el.find('ul');
			console.log($ul);
			_.each(this.collection.models, function(year){
				var yearView = new YearView({model: year});

				$ul.append( yearView.render() );
				this.childViews.push(yearView);   // Almacenamos las childviews para luego poder eliminarlas
			}, this);
		},

		animarTimeSlide: function(e) {
			//console.log(e.offsetX);
			console.log(e.pageX);
		},

		onClose: function() {
	        _(this.childViews).each(function(view) {
        		view.close();
      		});
	    },




	});

});