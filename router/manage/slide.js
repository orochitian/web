var router = require('express').Router();
var slider = require('../../model/slider');
var fileUpload = require('../fileUpload');
function render(res, data) {
    res.render('manage/slide.html', data);
}

router.post('/edit/getImg', function (req, res) {
    slider.findById(req.body.sid, function (err, info) {
        res.json({
            path : info.imgPath,
            name : info.imgName,
            size : info.imgSize,
            hash : info.imgHash,
            title : info.title,
            describe : info.describe
        });
    });
});

router.post('/editSlider/:category', function (req, res) {
    slider.findByIdAndUpdate(req.body.sid, {
        title : req.body.title,
        describe : req.body.describe,
        imgPath : req.body.imgPath,
        imgName : req.body.imgName,
        imgSize : req.body.imgSize,
        imgHash : req.body.imgHash
    }, function (err) {
        res.redirect('/manage/slide/' + req.params.category);
    });
});

router.get('/index', function (req, res) {
    slider.find({category:'index'}, function (err, sliders) {
        render(res, {
            title : '首页',
            link : '/manage',
            category : 'index',
            categoryName : '首页',
            sliders : sliders
        });
    });
});

router.get('/story', function (req, res) {
    slider.find({category:'story'}, function (err, sliders) {
        render(res, {
            title : '故事',
            link : '/manage/story',
            category : 'story',
            categoryName : '故事',
            sliders : sliders
        });
    });
});

router.get('/blog', function (req, res) {
    slider.find({category:'blog'}, function (err, sliders) {
        render(res, {
            title : '博客',
            link : '/manage/blog',
            category : 'blog',
            categoryName : '博客',
            sliders : sliders
        });
    });
});

//  上传
router.post('/upload', function (req, res, next) {
    fileUpload(req, res, {
        uploadDir : './uploadSource/slider'
    });
});

//  添加轮播
router.post('/addSlider/:category', function (req, res) {
    slider.create({
        title : req.body.title,
        describe : req.body.describe,
        category : req.params.category,
        imgPath : req.body.imgPath,
        imgName : req.body.imgName,
        imgSize : req.body.imgSize,
        imgHash : req.body.imgHash
    }, function () {
        res.redirect('/manage/slide/' + req.params.category);
    });
});

//  删除轮播
router.get('/deleteSlider/:category/:id', function (req, res) {
    slider.findByIdAndRemove(req.params.id, function (err) {
        res.redirect('/manage/slide/' + req.params.category);
    });
});

module.exports = router;
