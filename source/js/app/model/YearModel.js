define(function (require) {

	"use strict";

	var $           = require('jquery'),
		Backbone    = require('backbone');


	return  Backbone.Model.extend({

		urlRoot: "js/app/model/data.json?v=10",
	});

});