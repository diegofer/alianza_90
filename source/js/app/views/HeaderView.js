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
            'click #logo'          : 'irHome',
            'click #timeline-btn'  : 'irTimeline',
            'click #video-btn'     : 'irVideo',
        },


        irHome: function(event) {
        	if (Backbone.history.fragment != "") {  // si estoy en una url distinta al home 
        		router.navigate('/', true);
                this.$el.removeClass('header-year');
        	} else {
        		this.doScroll(event.currentTarget.id);  // si estoy en home solo hago scroll hasta el top de home
        	}      	
        },

        irTimeline: function(event) {

        	if (Backbone.history.fragment != "")  // si estoy en una url distinta al home 
        	{  
        		router.navigate('/', true);
        		this.$el.removeClass('header-year');

        		var self = this;

        		setTimeout(function(){
        			self.doScroll(event.currentTarget.id);
        		}, 700);
        		
        	} 
        	else 
        	{
        		this.doScroll(event.currentTarget.id);  // si estoy en home solo hago scroll hasta el top del timeline
        	}      	
        },


        irVideo: function() {

        },



		doScroll: function(elemId) {
			this.undelegateEvents();  // aseguramos que el evento corra una sola vez
			
			var pos;

			if (elemId === 'logo') pos = 0;
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