var router = require('express').Router();

router.use('/', require('./client/index'));

router.use('/story', require('./client/story'));

router.use('/blog', require('./client/blog'));

module.exports = router;
