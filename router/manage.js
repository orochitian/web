var router = require('express').Router();
var session = require('express-session');

router.use(function (req, res, next) {
    if( req.session.user ) {
        next();
    } else {
        res.send('没登录进不去，你说尴尬不尴尬？');
    }
});

//  轮播
router.use('/slide', require('./manage/slide'));

//  首页
router.use('/', require('./manage/index'));

//  故事
router.use('/story', require('./manage/story'));

//  博客
router.use('/blog', require('./manage/blog'));

//  工作
router.use('/work', require('./manage/work'));

//  心情
router.use('/mood', require('./manage/mood'));

//  相册
router.use('/photo', require('./manage/photo'));

//  上传资源管理
router.use('/uploadSource', require('./manage/uploadSource'));

module.exports = router;
