var mongoose = require('mongoose');
var welcome_schema = new mongoose.Schema({
    title : String,
    text : String
});
module.exports = welcome_schema;