var mongoose = require('mongoose');
var photo_schema = require('../schema/photo');
var photo = mongoose.model('photo', photo_schema);
module.exports = photo;
