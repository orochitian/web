var mongoose = require('mongoose');
var slider_schema = new mongoose.Schema({
    title : String,
    describe : String,
    category : String,
    imgPath : String,
    imgName : String,
    imgSize : String,
    imgHash : String
}, {
    timestamps : {
        createdAt : 'created_at',
        updatedAt : 'updated_at'
    }
});
module.exports = slider_schema;