var mongoose = require('mongoose');
var story_schema = new mongoose.Schema({
    title : String,
    preview : String,
    category : String,
    content : String
}, {
    timestamps : {
        createdAt : 'created_at',
        updatedAt : 'updated_at'
    }
});
module.exports = story_schema;