var mongoose = require('mongoose');
var workCategory_schema = new mongoose.Schema({
    name : String,
    describe : String,
    password : String,
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
module.exports = workCategory_schema;