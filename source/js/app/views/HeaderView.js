define(function (require) {

	"use strict";

	var $            = require('jquery'),
	    _            = require('underscore'),
        Backbone     = require('backbone'),
        NivoLightbox = require('src/Nivo-Lightbox/nivo-lightbox.min'),	   
        $boxItems    = $('.box', 'header');

	return  Backbone.View.extend({

		initialize: function() {		
			console.log('inicializando HeaderView');
            this.render();
		},


        events: {
            'click #logo'          : 'irHome',
            'click #timeline-btn'  : 'irTimeline',
            'click .box'           : 'goToSlide'
        },

        render: function() {
            var elem =  this.$el.find('#video-btn').nivoLightbox();
            //this.setScrollFunctions();
        },


        irHome: function(event) {
        	if (Backbone.history.fragment != "") {  // si estoy en una url distinta al home 
        		router.navigate('/', true);
        	} else {
        		this.doScroll(event.currentTarget.id);  // si estoy en home solo hago scroll hasta el top de home
        	}      	
        },


        irTimeline: function(event) {

        	if (Backbone.history.fragment != "")  // si estoy en una url distinta al home 
        	{  
        		router.navigate('/', true);

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


        goToSlide: function(event) {
            router.navigate('#/'+event.currentTarget.id, true);
        },


        setScrollFunctions: function() {

            var self      = this,
                $window   =  $(window),
                $timeline =  null, 
                $bottom   =  null, 
                permit    =  true,
                ready     =  false;

            

            $window.scroll(function(e){

                if (ready) {
                    
                    var scroll      = $window.scrollTop(),
                        posTimeline = $timeline.position().top,
                        posBottom   = $bottom.position().top;

                    console.log('SCROLL: '+scroll+' ALTURA: '+posTimeline);

                    if (scroll >= posTimeline && permit) {
                        self.$el.addClass('header-timeline');
                        permit = false;
                    };




                } else{

                    $timeline  = $("#section-bottom") || null;
                    $bottom    = $("#section-bottom") || null;

                    if ($timeline && $bottom) ready = true;
                };
                
                
       
                

                    


            });

            
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

        selectBoxItem: function(boxItem) {
            $boxItems.removeClass('active');

            if (boxItem) {
                this.$el.find('#'+boxItem).addClass('active');
            }
        }


	});

});