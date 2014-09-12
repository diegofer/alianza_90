define(function (require) {

	"use strict";

	var $           = require('jquery'),
		Backbone    = require('backbone'),

		yearModel   = require('app/model/YearModel');


	return  Backbone.Collection.extend({

		model: yearModel,
		url: "js/app/model/data.json?v=10",
	});

});