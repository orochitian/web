var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var app = express();

app.use( require('body-parser').urlencoded({extended : true}) );

app.use(session({
    secret : 'ryan lee',
    resave : true,
    saveUninitialized : true
}));

app.set('view engine', 'html');

require('nunjucks').configure('./view', {
    autoescape : true,
    express : app,
    watch : true
});

app.use('/static', express.static(__dirname + '/static'));

app.use('/uploadSource', express.static(__dirname + '/uploadSource'));

app.use('/ueditor', require('./router/ueditor'));

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
// });

app.use('/', require('./router/client'));
app.use('/manage', require('./router/manage'));

app.use('*', function (req, res) {
    res.send('<h3>页面没找到，你说尴尬不尴尬？</h3>');
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/web', {useMongoClient : true}, function (err) {
    if( err ) {
        console.log('Database start failed!');
    } else {
        app.listen('8080', function (err) {
            if( err ) {
                console.log('Server start failed!');
            } else {
                console.log('Server is running...')
            }
        });
    }
});