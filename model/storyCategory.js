var mongoose = require('mongoose');
var storyCategory_schema = require('../schema/storyCategory');
var storyCategory = mongoose.model('storyCategory', storyCategory_schema);
module.exports = storyCategory;
