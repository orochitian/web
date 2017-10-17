var router = require('express').Router();
var storyCategory = require('../../model/storyCategory');

router.get('/', function (req, res) {
    storyCategory.find(function (err, info) {
        res.render('manage/story.html', {
            title : '故事管理',
            stories : info
        });
    });
});

//  添加分类
router.post('/addCategory', function (req, res) {
    storyCategory.findOne({categoryName : req.body.categoryName}, function (err, info) {
        if( info ) {
            res.send('分类名重复');
        } else {
            new storyCategory({
                categoryName : req.body.categoryName,
                categoryDescribe : req.body.categoryDescribe
            }).save();
            res.redirect('/manage/story');
        }
    });
});

//  删除分类
router.get('/deleteCategory', function (req, res) {
    storyCategory.findOne({_id : req.query.sid}, function (err, info) {
        if( !info ) {
            res.send('分类不存在');
        } else {
            storyCategory.remove({_id : req.query.sid}, function (err) {
                res.redirect('/manage/story');
            });
        }
    });
});

//  故事分类详情
router.get('/:name', function (req, res) {
    res.render('manage/story_list.html', {
        category : req.params.name
    });
});

router.get('/:name/addStory', function (req, res) {
    res.render('manage/story_add.html');
});

module.exports = router;
