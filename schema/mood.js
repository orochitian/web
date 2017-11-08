var mongoose = require('mongoose');
var mood_schema = new mongoose.Schema({
    text : String
}, {
    timestamps : {
        createdAt : 'created_at',
        updatedAt : 'updated_at'
    }
});
module.exports = mood_schema;