var router = require('express').Router();
var workCategory = require('../../model/workCategory');
var work = require('../../model/work');
var slider = require('../../model/slider');
var pagination = require('../manage/pagination');

router.use(function (req, res, next) {
    req.pageInfo = {
        currentCategory : 'work'
    };
    next();
});

router.get('/:category', function (req, res) {
    workCategory.findOne({name:req.params.category}, function (err, info) {
        if( info ) {
            req.pageInfo.categoryName = req.params.category;
            Promise.all([
                workCategory.find({show:'是'}).then(function (info) {
                    req.pageInfo.category = info;
                }),
                work.find({category:req.params.category}).then(function (info) {
                    req.pageInfo.work = info;
                }),
                slider.findOne({category:'work'}).then(function (info) {
                    req.pageInfo.slider = info;
                })
            ]).then(function () {
                var paginationModel = pagination.model(work, req.query.page, 2, 10, req.pageInfo.work.length, {category:req.params.category});
                paginationModel.sort('-created_at').then(function (work) {
                    req.pageInfo.pageInfo = pagination.pageInfo;
                    req.pageInfo.article = work;
                    res.render('list.html', req.pageInfo);
                });
            });
        } else {
            res.send('分类不存在，你说尴尬不尴尬');
        }
    });
});

router.get('/:category/:id', function (req, res) {
    workCategory.findOne({name:req.params.category}, function (err, info) {
        if( info ) {
            req.pageInfo.categoryName = req.params.category;
            Promise.all([
                workCategory.find({show:'是'}).then(function (info) {
                    req.pageInfo.category = info;
                }),
                work.findById(req.params.id).then(function (info) {
                    req.pageInfo.article = info;
                }),
                slider.findOne({category:'work'}).then(function (info) {
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
