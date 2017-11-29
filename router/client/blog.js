var router = require('express').Router();
var blogCategory = require('../../model/blogCategory');
var blog = require('../../model/blog');
var slider = require('../../model/slider');
var pagination = require('../manage/pagination');

router.use(function (req, res, next) {
    req.pageInfo = {
        currentCategory : 'blog'
    };
    next();
});

router.get('/:category', function (req, res) {
    blogCategory.findOne({name:req.params.category}, function (err, info) {
        if( info ) {
            req.pageInfo.categoryName = req.params.category;
            Promise.all([
                blogCategory.find({show:'是'}).then(function (info) {
                    req.pageInfo.category = info;
                }),
                blog.find({category:req.params.category}).then(function (info) {
                    req.pageInfo.blog = info;
                }),
                slider.findOne({category:'blog'}).then(function (info) {
                    req.pageInfo.slider = info;
                })
            ]).then(function () {
                var paginationModel = pagination.model(blog, req.query.page, 2, 6, req.pageInfo.blog.length, {category:req.params.category});
                paginationModel.sort('-created_at').then(function (blog) {
                    req.pageInfo.pageInfo = pagination.pageInfo;
                    req.pageInfo.article = blog;
                    res.render('list.html', req.pageInfo);
                });
            });
        } else {
            res.send('分类不存在，你说尴尬不尴尬');
        }
    });
});

router.get('/:category/:id', function (req, res) {
    blogCategory.findOne({name:req.params.category}, function (err, info) {
        if( info ) {
            req.pageInfo.categoryName = req.params.category;
            Promise.all([
                blogCategory.find({show:'是'}).then(function (info) {
                    req.pageInfo.category = info;
                }),
                blog.findById(req.params.id).then(function (info) {
                    req.pageInfo.article = info;
                }),
                slider.findOne({category:'blog'}).then(function (info) {
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
