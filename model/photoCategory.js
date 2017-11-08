var mongoose = require('mongoose');
var photoCategory_schema = require('../schema/photoCategory');
var photoCategory = mongoose.model('photoCategory', photoCategory_schema);
module.exports = photoCategory;
