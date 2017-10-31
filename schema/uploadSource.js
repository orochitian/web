var mongoose = require('mongoose');
var upload_source_schema = new mongoose.Schema({
    path : String,
    hash : String,
    name : String,
    size : String
}, {
    timestamps : {
        createdAt : 'created_at',
        updatedAt : 'updated_at'
    }
});
module.exports = upload_source_schema;