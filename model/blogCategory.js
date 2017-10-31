var mongoose = require('mongoose');
var blogCategory_schema = require('../schema/blogCategory');
var blogCategory = mongoose.model('blogCategory', blogCategory_schema);
module.exports = blogCategory;
