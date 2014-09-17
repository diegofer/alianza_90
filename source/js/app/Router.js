define(function (require) {

	"use strict";

	var $                = require('jquery'),
		Backbone         = require('backbone'),

		HeaderView        = require('app/views/HeaderView'),
		HomeView          = require('app/views/HomeView'),
		TimeLineView      = require('app/views/TimeLineView'),
		YearDetalleView   = require('app/views/YearDetalleView'),
		BottomView        = require('app/views/BottomView'),

		$header           = $('header');
		


	return Backbone.Router.extend({

		initialize: function(data) {
			console.log('iniciando router');
			
			this.years = data.years;
			this.actualViews = [];

			this.headerView = new HeaderView({ el: $header});

			$(window).resize(this.updateSize);     // When the browser changes size
		},

		routes: {
			''           :'inicio',
			//':number'   : 'year'
		},


		inicio: function() {
			this.closeActualViews();
			$header.removeClass('header-year');

			var homeView = new HomeView({
				contenedorId: '#main-content'
			});

			this.actualViews.push(homeView);


			var timeLineView = new TimeLineView({
				collection: this.years,
				contenedorId: '#main-content'
			});
			this.actualViews.push(timeLineView);

			var bottomView = new BottomView({
				contenedorId: '#main-content'
			});
			this.actualViews.push(bottomView);
			console.log(this.actualViews);
		},


		year: function(year) {
			var yearModel = this.years.findWhere({year:parseInt(year)});

			if(!yearModel) {
				alert("NO EXISTE ESTA PAGINA");
				return
			}	

			this.closeActualViews();

			window.location.href = '1920.html';

			// $header.addClass('header-year');   // mostramos el menu en el header
			// this.headerView.selectBoxItem(yearModel.get('year'));  // destacamos el elemento activo

			// var yearDetalleView = new YearDetalleView({
			// 	model        :yearModel,
			// 	contenedorId :'#main-content'
			// });

			// this.actualViews.push(yearDetalleView);
		},


		closeActualViews: function() {
			_(this.actualViews).each(function(view) {
        		view.close();
      		});
		},


		updateSize: function() {
		    var height = $(window).height();
		    var width  =  $(window).width();
		    console.log('window width: '+width);
		    if (width >= 768) {
		    	 $('.browser-height').height(height);
		    } else {
		    	$('.browser-height').height('auto');
		    }
		   
		},


	});

});