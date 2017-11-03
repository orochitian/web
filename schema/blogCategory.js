var mongoose = require('mongoose');
var blogCategory_schema = new mongoose.Schema({
    name : String,
    describe : String,
    show : String,
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
module.exports = blogCategory_schema;