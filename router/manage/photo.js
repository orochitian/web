var router = require('express').Router();
var photoCategory = require('../../model/photoCategory');
var photo = require('../../model/photo');
var pagination = require('./pagination');
var fileUpload = require('../fileUpload');

router.get('/', function (req, res) {
    photoCategory.find(function (err, info) {
        var paginationModel = pagination.model(photoCategory, req.query.page, 2, 3, info.length);
        paginationModel.sort('-created_at').then(function (photo) {
            res.render('manage/photo.html', {
                title : '相册管理',
                category : 'photo',
                categoryName : '相册管理',
                photos : photo,
                pageInfo : pagination.pageInfo
            });
        });
    });
});

//  分类封面上传
router.post('/category/cover', function (req, res) {
    fileUpload(req, res, {
        uploadDir : './uploadSource/cover'
    });
});

//  添加分类
router.post('/category/add', function (req, res) {
    photoCategory.create({
        name : req.body.name,
        describe : req.body.describe,
        show : req.body.show,
        imgPath : req.body.imgPath,
        imgName : req.body.imgName,
        imgSize : req.body.imgSize,
        imgHash : req.body.imgHash
    }, function () {
        res.redirect('/manage/photo');
    });
});

//  编辑分类
router.post('/editCategory', function (req, res) {
    photoCategory.findById(req.body.id, function (err, info) {
        if( info && info._id != req.body.id ) {
            res.send('分类已存在，你说尴尬不尴尬');
        } else {
            photo.update({category:info.name}, {
                category : req.body.name
            }, {multi:true}, function () {});
            photoCategory.update({_id : req.body.id}, {
                name : req.body.name,
                describe : req.body.describe,
                show : req.body.show,
                imgPath : req.body.imgPath,
                imgName : req.body.imgName,
                imgSize : req.body.imgSize,
                imgHash : req.body.imgHash
            }, function (err, info) {
                res.redirect('/manage/photo');
            });
        }
    });
});

//  获取相册封面
router.post('/edit/getImg', function (req, res) {
    photoCategory.findById(req.body.sid, function (err, info) {
        res.json(info);
    });
});

//  异步分类验证
router.post('/addCategoryExists', function (req, res) {
    photoCategory.findOne({name: req.body.name}, function (err, info) {
        info ? res.json({valid: false}) : res.json({valid: true});
    });
});
//  编辑分类时验证是否存在  要排除自身
router.post('/editCategoryExists', function (req, res) {
    photoCategory.findOne({name: req.body.name}, function (err, info) {
        if( info && info._id != req.body.sid ) {
            res.json({valid: false});
        } else {
            res.json({valid: true});
        }
    });
});

//  删除相册
router.get('/delete/:id/:category', function (req, res) {
    photo.remove({category:req.params.category}, function () {});
    photoCategory.findByIdAndRemove(req.params.id, function () {
        res.redirect('/manage/photo');
    });
});

//  相册照片列表
router.get('/:name', function (req, res) {
    res.render('manage/photo_list.html', {
        title : '相册',
        categoryName : req.params.name
    });
});

//  获取分类下图片
router.post('/getPic', function (req, res) {
    photo.find({category:req.body.category}, function (err, photos) {
        var images = [];
        var config = [];
        for( var i=0; i<photos.length; i++ ) {
            images.push('<img class="file-preview-image" src="' + photos[i].path + '" >');
            config.push({
                extra : {
                    id : photos[i]._id,
                    category : photos[i].category
                },
                caption : photos[i].name,
                size : photos[i].size,
                downloadUrl : photos[i].path
            });
        }
        res.json({images : images, config : config});
    });
});

//  上传图片
router.post('/picUpload', function (req, res) {
    fileUpload(req, res, {
        uploadDir : './uploadSource/photos'
    });
});

//  添加照片
router.post('/addPic', function (req, res) {
    photo.create({
        category : req.body.category,
        path : req.body.path,
        name : req.body.name,
        size : req.body.size
    }).then(function () {
        photoCategory.update({name:req.body.category}, {$inc: { childNum: 1 }}, function () {});
        res.json({result : '添加成功'});
    });
});

//  删除照片
router.post('/picDelete', function (req, res) {
    photoCategory.update({name:req.body.category}, {$inc: { childNum: -1 }}, function () {});
    photo.findByIdAndRemove(req.body.id, function () {
        res.json({ result : '删除成功'});
    });
});

module.exports = router;
