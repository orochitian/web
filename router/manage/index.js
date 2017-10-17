var router = require('express').Router();
var Welcome = require('../../model/welcome');

router.get('/', function (req, res) {
    Welcome.findOne(function (err, info) {
        res.render('manage/index.html', {
            title : '首页管理',
            welcome : info
        });
    });
});

router.post('/welcome', function (req, res) {
    Welcome.findOne(function (err, info) {
        if( !info ) {
            new Welcome({
                title : req.body.title,
                text : req.body.text
            }).save();
            res.redirect('/manage');
        } else {
            Welcome.update({_id: req.body.id}, {
                title : req.body.title,
                text : req.body.text
            }, function (err) {
                res.redirect('/manage');
            });
        }
    });
});

module.exports = router;
