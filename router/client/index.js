var router = require('express').Router();
var Welcome = require('../../model/welcome');
var storyCategory = require('../../model/storyCategory');
var blogCategory = require('../../model/blogCategory');
var workCategory = require('../../model/workCategory');
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
        slider.find({category:'index'}).then(function (info) {
            req.pageInfo.slider = info;
        }),
        storyCategory.find().then(function (info) {
            req.pageInfo.story = info;
        }),
        blogCategory.find().then(function (info) {
            req.pageInfo.blog = info;
        }),
        workCategory.find().then(function (info) {
            req.pageInfo.work = info;
        })
    ]).then(function () {
        res.render('index.html', req.pageInfo);
    });
});


module.exports = router;
