var mongoose = require('mongoose');
var work_schema = new mongoose.Schema({
    title : String,
    preview : String,
    category : String,
    content : String,
    date : String
}, {
    timestamps : {
        createdAt : 'created_at',
        updatedAt : 'updated_at'
    }
});
module.exports = work_schema;