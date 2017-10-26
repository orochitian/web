var mongoose = require('mongoose');
var slider_schema = new mongoose.Schema({
    title : String,
    describe : String,
    category : String,
    imgid : Number
}, {
    timestamps : {
        createdAt : 'created_at',
        updatedAt : 'updated_at'
    }
});
module.exports = slider_schema;