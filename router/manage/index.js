var router = require('express').Router();
var Welcome = require('../../model/welcome');

router.get('/', function (req, res) {
    Welcome.findOne(function (err, info) {
        res.render('manage/index.html', {
            title : '首页',
            categoryName : '首页',
            welcome : info
        });
    });
});

router.post('/welcome', function (req, res) {
    Welcome.findOneAndUpdate({}, {
        title : req.body.title,
        text : req.body.text
    }, {
        upsert : true
    },  function (err) {
        res.redirect('/manage');
    });
});

module.exports = router;
