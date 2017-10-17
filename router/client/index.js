var router = require('express').Router();
var Welcome = require('../../model/welcome');

router.get('/', function (req, res) {
    Welcome.findOne(function (err, info) {
        res.render('index.html', {
            welcome : info
        });
    });
});


module.exports = router;
