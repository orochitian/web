var mongoose = require('mongoose');
var work_schema = new mongoose.Schema({
    category : String,
    content : String,
    date : String,
    title : String,
    preview : {
        type : String,
        default : '工作日志，流水账'
    }
}, {
    timestamps : {
        createdAt : 'created_at',
        updatedAt : 'updated_at'
    }
});
module.exports = work_schema;