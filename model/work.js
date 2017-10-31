var mongoose = require('mongoose');
var work_schema = require('../schema/work');
var work = mongoose.model('work', work_schema);
module.exports = work;
