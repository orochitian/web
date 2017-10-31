var mongoose = require('mongoose');
var workCategory_schema = require('../schema/workCategory');
var workCategory = mongoose.model('workCategory', workCategory_schema);
module.exports = workCategory;
