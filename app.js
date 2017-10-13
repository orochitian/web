var express = require('express');
var app = express();

app.set('view engine', 'html');

require('nunjucks').configure('./view', {
    autoescape : true,
    express : app,
    watch : true
});

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.render('index.html');
});

app.use('*', function (req, res) {
    res.send('<h3>页面没找到，你说尴尬不尴尬？</h3>');
});

app.listen('8080', function() {
    console.log('服务器运行中...')
});