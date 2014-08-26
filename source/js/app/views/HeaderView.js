define(function (require) {

	"use strict";

	var $           = require('jquery'),
	    _           = require('underscore'),
		Backbone    = require('backbone');
	


	return  Backbone.View.extend({

		initialize: function() {		
			console.log('inicializando HeaderView');
		},
		
        events: {
            'click #home-btn'      : 'doScroll',
            'click #timeline-btn'  : 'doScroll',
            'click #video-btn'     : 'doScroll',
        },



		doScroll: function(event) {
			this.undelegateEvents();  // aseguramos que el evento corra una sola vez
			

			var elemId = event.currentTarget.id;
			var pos;

			if (elemId === 'home-btn') pos = 0;
			if (elemId === 'timeline-btn') pos = $("#section-timeline").position().top;
			if (elemId === 'video-btn') return;
			
			var self = this;
		    $("body, html").animate({ 
		    	scrollTop: pos }, 1500, function () {  
		    	self.delegateEvents();             
		    });
		},


	});

});