var express = require('express');
var router = express.Router();

//  轮播
router.use('/slide', require('./manage/slide'));

//  首页
router.use('/', require('./manage/index'));

//  故事
router.use('/story', require('./manage/story'));

module.exports = router;
