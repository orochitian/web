var router = require('express').Router();
var photoCategory = require('../../model/photoCategory');
var photo = require('../../model/photo');
var slider = require('../../model/slider');
var pagination = require('../manage/pagination');

router.use(function (req, res, next) {
    req.pageInfo = {
        currentCategory : 'photo'
    };
    next();
});

router.get('/:category', function (req, res) {
    photoCategory.findOne({name:req.params.category}, function (err, info) {
        if( info ) {
            req.pageInfo.categoryName = req.params.category;
            Promise.all([
                photoCategory.find({show:'是'}).then(function (info) {
                    req.pageInfo.category = info;
                }),
                photoCategory.findOne({name:req.params.category}).then(function (info) {
                    req.pageInfo.currentList = info;
                }),
                photo.find({category:req.params.category}).then(function (info) {
                    req.pageInfo.photo = info;
                })
            ]).then(function () {
                res.render('photo.html', req.pageInfo);
                // var paginationModel = pagination.model(photo, req.query.page, 2, 6, req.pageInfo.photo.length, {category:req.params.category});
                // paginationModel.sort('-created_at').then(function (photo) {
                //     req.pageInfo.pageInfo = pagination.pageInfo;
                //     req.pageInfo.article = photo;
                //     res.render('photo.html', req.pageInfo);
                // });
            });
        } else {
            res.send('分类不存在，你说尴尬不尴尬');
        }
    });
});

module.exports = router;