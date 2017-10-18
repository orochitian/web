var router = require('express').Router();
var storyCategory = require('../../model/storyCategory');
var story = require('../../model/story');

router.get('/', function (req, res) {
    storyCategory.find(function (err, info) {
        res.render('manage/story.html', {
            title : '故事管理',
            datas : info
        });
    });
});

//  添加分类
router.post('/addCategory', function (req, res) {
    storyCategory.findOne({name : req.body.name}, function (err, info) {
        if( info ) {
            res.send('分类名重复');
        } else {
            storyCategory.create({
                name : req.body.name,
                describe : req.body.describe
            }, function () {
                res.redirect('/manage/story');
            });
        }
    });
});

//  编辑分类
router.post('/editCategory', function (req, res) {
    storyCategory.update({_id : req.query.sid}, {
        name : req.body.name,
        describe : req.body.describe
    }, function (err, info) {
        res.redirect('/manage/story');
    });
});

//  删除分类
router.get('/deleteCategory', function (req, res) {
    story.remove({category:req.query.category}, function () {});
    storyCategory.remove({_id : req.query.sid}, function (err) {
        res.redirect('/manage/story');
    });
});

//  分类详情列表
router.get('/:name', function (req, res) {
    storyCategory.findOne({name:req.params.name}, function (err, info) {
        if( info ) {
            story.find({category:req.params.name}, function (err, stories) {
                res.render('manage/story_list.html', {
                    category : req.params.name,
                    datas : stories,
                    title : '故事分类-' + req.params.name
                });
            });
        } else {
            res.send('分类不存在');
        }
    });
});

//  写故事
router.get('/:name/addStory', function (req, res) {
    storyCategory.findOne({name:req.params.name}, function (err, info) {
        if( info ) {
            res.render('manage/story_add.html', {
                category : req.params.name,
                title : '写故事'
            });
        } else {
            res.send('分类不存在');
        }
    });
});
router.post('/:name/addStory', function (req, res) {
    storyCategory.findOne({name:req.params.name}, function (err, info) {
        if( info ) {
            storyCategory.update({name: req.params.name}, {$inc: { childNum: 1 }}, function() {});
            story.create({
                title : req.body.title,
                preview : req.body.preview,
                category : req.params.name,
                content : req.body.content
            }, function () {
                res.redirect('/manage/story/' + req.params.name);
            });
        } else {
            res.send('分类不存在');
        }
    });
});

//  编辑故事
router.get('/:name/editStory', function (req, res) {
    storyCategory.findOne({name:req.params.name}, function (err, info) {
        if( info ) {
            story.findOne({_id:req.query.sid}, function (err, story) {
                if( story ) {
                    storyCategory.find(function (err, categories) {
                        res.render('manage/story_edit.html', {
                            categories : categories,
                            category : story.category,
                            title : story.title,
                            preview : story.preview,
                            content : story.content
                        });
                    });
                } else {
                    res.send('文章不存在，你说尴尬不尴尬');
                }
            });
        } else {
            res.send('分类不存在，你说尴尬不尴尬');
        }
    });
});
router.post('/:name/editStory', function (req, res) {
    storyCategory.findOne({name:req.params.name}, function (err, info) {
        if( info ) {
            storyCategory.update({name: req.params.name}, {$inc: { childNum: 1 }}, function() {});
            story.create({
                title : req.body.title,
                preview : req.body.preview,
                category : req.params.name,
                content : req.body.content
            }, function () {
                res.redirect('/manage/story/' + req.params.name);
            });
        } else {
            res.send('分类不存在');
        }
    });
});

//  删除故事
router.get('/:name/deleteStory', function (req, res) {
    storyCategory.update({name: req.params.name}, {$inc: { childNum: -1 }}, function() {});
    story.remove({_id:req.query.sid}, function (err, info) {
       res.redirect('/manage/story/' + req.params.name);
    });
});

module.exports = router;
