var router = require('express').Router();
var admin = require('../admin');
var session = require('express-session');

//  admin login
router.post('/login', function (req, res) {
    if( req.body.username === admin.username && req.body.password === admin.password ) {
        req.session.user = admin;
        res.redirect('/manage');
    } else {
        res.send('<h3>用户名或密码错误，你说尴尬不尴尬？</h3>')
    }
});

router.use('/', require('./client/index'));

router.use('/story', require('./client/story'));

router.use('/blog', require('./client/blog'));

router.use('/work', require('./client/work'));

router.use('/photo', require('./client/photo'));

module.exports = router;
