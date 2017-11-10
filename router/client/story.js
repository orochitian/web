var router = require('express').Router();
var storyCategory = require('../../model/storyCategory');
var story = require('../../model/story');

router.use(function (req, res, next) {
    req.pageInfo = {};
    next();
});

router.get('/:category', function (req, res) {
    Promise.all([
        storyCategory.find().then(function (info) {
            req.pageInfo.category = info;
        }),
        story.find({category:req.params.category}).then(function (info) {
            req.pageInfo.story = info;
        })
    ]).then(function () {
        res.render('story.html', req.pageInfo);
    });
});


module.exports = router;
