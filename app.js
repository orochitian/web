var express = require('express');
var mongoose = require('mongoose');
var app = express();
var formidable = require('formidable');

app.use( require('body-parser').urlencoded({extended : true}) );

app.set('view engine', 'html');

require('nunjucks').configure('./view', {
    autoescape : true,
    express : app,
    watch : true
});

app.use('/static', express.static(__dirname + '/static'));

app.use('/ueditor', require('./router/ueditor'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.post('/test', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + '/upload/slider';
    form.parse(req, function (err, fileds, files) {
        console.log(fileds);
    });
    res.json({});
});
app.get('/upload', function (req, res) {
    res.render('manage/upload.html', {
        title : '上传'
    });
});
app.use('/', require('./router/client'));
app.use('/manage', require('./router/manage'));

app.use('*', function (req, res) {
    res.send('<h3>页面没找到，你说尴尬不尴尬？</h3>');
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/web', {useMongoClient : true}, function (err) {
    if( err ) {
        console.log('数据库连接失败.');
    } else {
        app.listen('8080', function (err) {
            if( err ) {
                console.log('服务器启动失败.');
            } else {
                console.log('服务器运行中.')
            }
        });
    }
});