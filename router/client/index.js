var router = require('express').Router();
var Welcome = require('../../model/welcome');
var storyCategory = require('../../model/storyCategory');
var slider = require('../../model/slider');

router.use(function (req, res, next) {
    req.pageInfo = {};
    next();
});

router.get('/', function (req, res) {
    Promise.all([
        Welcome.findOne().then(function (info) {
            req.pageInfo.welcome = info;
        }),
        storyCategory.find().then(function (info) {
            req.pageInfo.story = info;
        }),
        slider.find({category:'index'}).then(function (info) {
            req.pageInfo.slider = info;
        })
    ]).then(function () {
        res.render('index.html', req.pageInfo);
    });
});


module.exports = router;
