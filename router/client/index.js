var router = require('express').Router();
var Welcome = require('../../model/welcome');
var storyCategory = require('../../model/storyCategory');
var blogCategory = require('../../model/blogCategory');
var workCategory = require('../../model/workCategory');
var slider = require('../../model/slider');
var photoCategory = require('../../model/photoCategory');
var mood = require('../../model/mood');

router.use(function (req, res, next) {
    req.pageInfo = {};
    next();
});
//  disclaimer
router.get('/disclaimer', function (req, res) {
    res.render('disclaimer.html');
});

router.get('/', function (req, res) {
    Promise.all([
        Welcome.findOne().then(function (info) {
            req.pageInfo.welcome = info;
        }),
        slider.find({category:'index'}).then(function (info) {
            req.pageInfo.slider = info;
        }),
        storyCategory.find().sort('-created_at').then(function (info) {
            req.pageInfo.story = info;
        }),
        blogCategory.find().then(function (info) {
            req.pageInfo.blog = info;
        }),
        photoCategory.find().then(function (info) {
            req.pageInfo.photo = info;
        }),
        workCategory.find().sort('-created_at').then(function (info) {
            req.pageInfo.work = info;
        }),
        mood.find().sort('-created_at').then(function (info) {
            req.pageInfo.mood = info;
        })
    ]).then(function () {
        res.render('index.html', req.pageInfo);
    });
});


module.exports = router;
