var mongoose = require('mongoose');
var storyCategory_schema = new mongoose.Schema({
    categoryName : String,
    categoryDescribe : String
}, {
    timestamps : {
        createdAt : 'created_at',
        updatedAt : 'updated_at'
    }
});
module.exports = storyCategory_schema;