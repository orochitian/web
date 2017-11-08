var mongoose = require('mongoose');
var photo_schema = new mongoose.Schema({
    name : String,
    path : String,
    category : String,
    size : Number
}, {
    timestamps : {
        createdAt : 'created_at',
        updatedAt : 'updated_at'
    }
});
module.exports = photo_schema;