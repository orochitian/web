var router = require('express').Router();
var mood = require('../../model/mood');

router.get('/', function (req, res) {
    mood.find({}, function (err, mood) {
        res.render('manage/mood.html', {
            title : '心情',
            categoryName : '心情',
            mood : mood
        });
    });
});

router.post('/add', function (req, res) {
    mood.create({text : req.body.text}, function () {
        res.redirect('/manage/mood');
    });
});

router.post('/edit', function (req, res) {
    mood.findByIdAndUpdate(req.body.mid, {text:req.body.text}, function () {
        res.redirect('/manage/mood');
    });
});

router.get('/delete/:mid', function (req, res) {
    mood.findByIdAndRemove(req.params.mid, function () {
        res.redirect('/manage/mood');
    });
});

module.exports = router;
