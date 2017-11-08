var mongoose = require('mongoose');
var photoCategory_schema = new mongoose.Schema({
    name : String,
    describe : String,
    show : String,
    imgPath : String,
    imgName : String,
    imgSize : String,
    imgHash : String,
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
module.exports = photoCategory_schema;