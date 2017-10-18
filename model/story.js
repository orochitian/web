var mongoose = require('mongoose');
var story_schema = require('../schema/story');
var story = mongoose.model('story', story_schema);
module.exports = story;
