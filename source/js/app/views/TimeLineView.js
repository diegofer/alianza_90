define(function(require){

	"use strict"

	var $                = require('jquery'),
		_                = require('underscore'),
		Backbone         = require('backbone'),
		tpl              = require('text!tpl/TimeLine.html'),

		YearView         = require('app/views/YearView'),

		template         = _.template(tpl);
 

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

		render: function() {
			this.$el.height(this.browserHeight)
			this.$el.html( template() );
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

		onClose: function() {
	        _(this.childViews).each(function(view) {
        		view.close();
      		});
	    },




	});

});