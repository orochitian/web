var router = require('express').Router();
var slider = require('../../model/slider');

function render(res, data) {
    res.render('manage/slide.html', data);
}

router.get('/index', function (req, res) {
    slider.find({category:'index'}, function (err, sliders) {
        render(res, {
            title : '首页',
            link : '/manage',
            category : 'index',
            sliders : sliders
        });
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
        imgSize : req.body.imgSize
    }, function () {
        res.redirect('/manage/slide/' + req.params.category);
    });
});

module.exports = router;
