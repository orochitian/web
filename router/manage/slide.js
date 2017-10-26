var router = require('express').Router();
var slider = require('../../model/slider');

function render(res, data) {
    res.render('manage/slide.html', data);
}

router.get('/index', function (req, res) {
    slider.find({category:'index'}, function (err, sliders) {

    });
    render(res, {
        title : '首页',
        link : '/manage'
    });
});

module.exports = router;
