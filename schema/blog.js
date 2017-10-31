var mongoose = require('mongoose');
var blog_schema = new mongoose.Schema({
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
module.exports = blog_schema;