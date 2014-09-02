define(function (require) {

	"use strict";

	var $                = require('jquery'),
		Backbone         = require('backbone'),

		HeaderView        = require('app/views/HeaderView'),
		HomeView          = require('app/views/HomeView'),
		TimeLineView      = require('app/views/TimeLineView'),
		YearDetalleView   = require('app/views/YearDetalleView'),

		$mainContent      = $('#main-content');
		


	return Backbone.Router.extend({

		initialize: function(data) {
			console.log('iniciando router');
			
			this.years = data.years;
			this.actualViews = [];

			var headerView = new HeaderView({ el: $('header')});

			$(window).resize(this.updateSize);     // When the browser changes size
		},

		routes: {
			''           :'inicio',
			':number'   : 'year'
		},


		inicio: function() {
			this.closeActualViews();

			var homeView = new HomeView({
				contenedorId: '#main-content'
			});

			this.actualViews.push(homeView);


			var timeLineView = new TimeLineView({
				collection: this.years,
				contenedorId: '#main-content'
			});
			this.actualViews.push(timeLineView);
		},


		year: function(year) {
			var yearModel = this.years.findWhere({year:parseInt(year)});

			if(!yearModel) {
				alert("NO EXISTE ESTA PAGINA");
				return
			}	

			this.closeActualViews();

			var yearDetalleView = new YearDetalleView({
				model        :yearModel,
				contenedorId :'#main-content'
			});

			this.actualViews.push(yearDetalleView);
		},


		closeActualViews: function() {
			_(this.actualViews).each(function(view) {
        		view.close();
      		});
		},


		updateSize: function() {
		    var height = $(window).height();
		    var width  =  $(window).width();
		    console.log(width);
		    if (width >= 768) {
		    	 $('.browser-height').height(height);
		    };
		   
		},


	});

});