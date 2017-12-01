var router = require('express').Router();

router.use('/', require('./client/index'));

router.use('/story', require('./client/story'));

router.use('/blog', require('./client/blog'));

router.use('/work', require('./client/work'));

router.use('/photo', require('./client/photo'));

module.exports = router;
