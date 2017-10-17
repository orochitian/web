var mongoose = require('mongoose');
var welcome_schema = require('../schema/welcom');
var welcome = mongoose.model('welcome', welcome_schema);
module.exports = welcome;
