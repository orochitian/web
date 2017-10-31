var express = require('express');
var router = express.Router();

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

module.exports = router;
