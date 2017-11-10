var express = require('express');
var router = express.Router();
var Welcome = require('../model/welcome');

router.use('/', require('./client/index'));

router.use('/story', require('./client/story'));

module.exports = router;
