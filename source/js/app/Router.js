define(function (require) {

	"use strict";

	var $                = require('jquery'),
		Backbone         = require('backbone');


	return Backbone.Router.extend({

		initialize: function() {
			console.log('iniciando router');

			// function jqUpdateSize(){
			//     // Get the dimensions of the viewport
			//     var width = $(window).width();
			//     var height = $(window).height();

			//     $('#jqWidth').html(width);      // Display the width
			//     $('#jqHeight').html(height);    // Display the height
			// };
			$(document).ready(this.updateSize);    // When the page first loads
			$(window).resize(this.updateSize);     // When the browser changes size
		},

		updateSize: function() {
			var width = $(window).width();
		    var height = $(window).height();

		    $('.contenedor').height(height);
		    console.log(width)
		    console.log('ALTO')
		    console.log(height)
		},

		


	});

});