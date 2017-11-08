var mongoose = require('mongoose');
var mood_schema = require('../schema/mood');
var mood = mongoose.model('mood', mood_schema);
module.exports = mood;
