var router = require('express').Router();
var storyCategory = require('../../model/storyCategory');
var story = require('../../model/story');
var slider = require('../../model/slider');
var pagination = require('../manage/pagination');

router.use(function (req, res, next) {
    req.pageInfo = {
        currentCategory : 'story'
    };
    next();
});

router.get('/:category', function (req, res) {
    storyCategory.findOne({name:req.params.category}, function (err, info) {
        if( info ) {
            req.pageInfo.categoryName = req.params.category;
            Promise.all([
                storyCategory.find({show:'是'}).sort('-created_at').then(function (info) {
                    req.pageInfo.category = info;
                }),
                story.find({category:req.params.category}).then(function (info) {
                    req.pageInfo.story = info;
                }),
                slider.findOne({category:'story'}).then(function (info) {
                    req.pageInfo.slider = info;
                })
            ]).then(function () {
                var paginationModel = pagination.model(story, req.query.page, 2, 6, req.pageInfo.story.length, {category:req.params.category});
                paginationModel.sort('-created_at').then(function (story) {
                    req.pageInfo.pageInfo = pagination.pageInfo;
                    req.pageInfo.article = story;
                    res.render('list.html', req.pageInfo);
                });
            });
        } else {
            res.send('分类不存在，你说尴尬不尴尬');
        }
    });
});

router.get('/:category/:id', function (req, res) {
    storyCategory.findOne({name:req.params.category}, function (err, info) {
        if( info ) {
            req.pageInfo.categoryName = req.params.category;
            Promise.all([
                storyCategory.find({show:'是'}).sort('-created_at').then(function (info) {
                    req.pageInfo.category = info;
                }),
                story.findById(req.params.id).then(function (info) {
                    req.pageInfo.article = info;
                }),
                slider.findOne({category:'story'}).then(function (info) {
                    req.pageInfo.slider = info;
                })
            ]).then(function () {
                res.render('article.html', req.pageInfo);
            });
        } else {
            res.send('分类不存在，你说尴尬不尴尬');
        }
    });
});

module.exports = router;
