var router = require('express').Router();
var Welcome = require('../../model/welcome');
var storyCategory = require('../../model/storyCategory');

router.use(function (req, res, next) {
    req.pageInfo = {};
    next();
});

router.get('/', function (req, res) {
    Welcome.findOne().then(function (info) {
        req.pageInfo.welcome = info;
    });
    storyCategory.find().then(function (info) {
        req.pageInfo.story = info;
        res.render('index.html', req.pageInfo);
    });
});


module.exports = router;
