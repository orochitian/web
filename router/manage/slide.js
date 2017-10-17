var router = require('express').Router();

function render(res, data) {
    res.render('manage/slide.html', data);
}

router.get('/index', function (req, res) {
    render(res, {
        title : '首页轮播管理'
    });
});

module.exports = router;
