var mongoose = require('mongoose');
var blog_schema = require('../schema/blog');
var blog = mongoose.model('blog', blog_schema);
module.exports = blog;
