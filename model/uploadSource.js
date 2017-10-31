var mongoose = require('mongoose');
var upload_source_schema = require('../schema/uploadSource');
var uploadSource = mongoose.model('uploadSource', upload_source_schema);
module.exports = uploadSource;
