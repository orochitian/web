var mongoose = require('mongoose');
var slider_schema = require('../schema/slider');
var slider = mongoose.model('slider', slider_schema);
module.exports = slider;
