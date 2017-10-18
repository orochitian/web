var mongoose = require('mongoose');
var storyCategory_schema = new mongoose.Schema({
    name : String,
    describe : String,
    childNum : {
        type : Number,
        default : 0
    }
}, {
    timestamps : {
        createdAt : 'created_at',
        updatedAt : 'updated_at'
    }
});
module.exports = storyCategory_schema;